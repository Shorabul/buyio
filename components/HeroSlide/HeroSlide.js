"use client";

import CategorySlideshow from "./CategorySlideshow";

export default function HeroSection() {
    return (
        <section className="relative w-full h-[600px] bg-gray-100">
            {/* Hero Background */}
            <img
                src="https://coderthemes.com/cartzilla-laravel/assets/img/home/fashion/v2/hero/image.png"
                alt="Fall Collection"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    New Fall Season 2025
                </h1>
                <p className="text-lg md:text-xl mb-8">
                    The new stylish collection — Shop now
                </p>

                {/* Category Slideshow inside hero */}
                <div className="w-full max-w-md">
                    <CategorySlideshow />
                </div>
            </div>
        </section>
    );
}
