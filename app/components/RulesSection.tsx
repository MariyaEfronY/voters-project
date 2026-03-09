import { Gavel, CheckCircle, FileText } from "lucide-react";

const electionRules = [
    { title: "Model Code of Conduct", desc: "Guidelines for political parties and candidates during election periods.", icon: <Gavel /> },
    { title: "Voter Eligibility", desc: "Citizens must be 18+ and have a valid EPIC card registered in the roll.", icon: <CheckCircle /> },
    { title: "Nomination Process", desc: "Strict documentation requirements for all contesting candidates.", icon: <FileText /> },
];

export default function RulesSection() {
    return (
        <section id="rules" className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Electoral Guidelines</h3>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {electionRules.map((rule, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 hover:shadow-2xl transition-all group">
                            <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                                {rule.icon}
                            </div>
                            <h5 className="text-xl font-black mb-3 text-slate-900">{rule.title}</h5>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">{rule.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}