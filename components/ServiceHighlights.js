"use client";

import React from "react";
import { Truck, CreditCard, RotateCcw, Headset } from "lucide-react";

const features = [
    {
        icon: Truck,
        title: "Free Shipping & Returns",
        description: "For all orders over $199.00",
    },
    {
        icon: CreditCard,
        title: "Secure Payment",
        description: "We ensure secure payment",
    },
    {
        icon: RotateCcw,
        title: "Money Back Guarantee",
        description: "Returning money 30 days",
    },
    {
        icon: Headset,
        title: "24/7 Customer Support",
        description: "Friendly customer support",
    },
];

export default function ServiceHighlights() {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                                    <Icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
