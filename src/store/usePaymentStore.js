import { create } from "zustand";
import api from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { useBatchStore } from "./useBatchStore";

export const usePaymentStore = create((set) => ({
    loading: false,
    payingBatchId: null,

    startPayment: async (batchId, batchName, price) => {
        try {
            set({ loading: true, payingBatchId: batchId });

            // 1. Create order from backend
            const { data } = await api.post("/payments/create-order", { batchId });

            if (!data.order) {
                alert("Order creation failed");
                set({ loading: false, payingBatchId: null });
                return;
            }
            // 2. Razorpay options
            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: "INR",
                name: "Suffah Education",
                description: batchName,
                order_id: data.order.id,

                handler: async function (response) {
                    try {
                        const verifyRes = await api.post(
                            "/payments/verify-payment",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                batchId,
                            },
                            { withCredentials: true }
                        );

                        if (verifyRes.data?.success) {

                            // ✅ Update user
                            useAuthStore.setState({ user: verifyRes.data.user });

                            // ✅ REFRESH enrolled batches list
                            const { getMyEnrolledBatches } = useBatchStore.getState();
                            await getMyEnrolledBatches();
                            alert("✅ Payment Successful!");
                            // set({ loading: false, payingBatchId: null });
                            window.location.reload();
                        } else {
                            alert("Payment verification failed");
                            set({ loading: false, payingBatchId: null });
                        }
                    } catch (err) {
                        console.log(err);
                        alert("Payment verify error");
                        set({ loading: false, payingBatchId: null });
                    }
                },

                modal: {
                    ondismiss: function () {
                        // User closed Razorpay modal without paying
                        set({ loading: false, payingBatchId: null });
                    },
                },

                theme: {
                    color: "#0a7d38",
                },
            };
            if (!window.Razorpay) {
                throw new Error("Razorpay SDK not available on window");
            }
            const rzp = new window.Razorpay(options);
            rzp.open();

            set({ loading: false });
        } catch (err) {
            console.error("Payment Error:", err?.response || err);
            set({ loading: false, payingBatchId: null });
        }
    },

    resetPayingBatchId: () => set({ payingBatchId: null }),
}));
