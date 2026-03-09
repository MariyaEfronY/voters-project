import { ShieldCheck, Target, Award } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <h3 className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 text-center md:text-left">Who We Are</h3>
                        <h4 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Upholding the Sanctity of Democratic Elections</h4>
                        <p className="text-slate-600 font-medium leading-relaxed mb-8">
                            The State Election Commission is an independent constitutional body. Our mission is to conduct free, fair, and transparent elections, ensuring every eligible citizen can cast their vote without fear or technical barriers.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><ShieldCheck /></div>
                                <div><p className="font-bold">Secured Portals</p><p className="text-xs text-slate-500">ISO 27001 Certified</p></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Target /></div>
                                <div><p className="font-bold">Accurate Rolls</p><p className="text-xs text-slate-500">Real-time updates</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 bg-slate-100 rounded-[3rem] p-4">
                        <img src="0.webp" className="rounded-[2.5rem] shadow-xl" alt="About" />
                    </div>
                </div>
            </div>
        </section>
    );
}