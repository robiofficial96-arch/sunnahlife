import { Metadata } from "next";
import SymptomChecker from "@/components/SymptomChecker";
import { Stethoscope, ShieldAlert, HeartPulse, CheckCircle2, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "লক্ষণ পরীক্ষা ও সেলফ ডায়াগনোসিস | সুন্নাহলাইফ",
  description: "কুরআন ও সুন্নাহর আলোকে আপনার শারীরিক, মানসিক বা আধ্যাত্মিক লক্ষণ পরীক্ষা করুন এবং সরাসরি WhatsApp-এ ফলাফলসহ রাক্বীর সাথে যোগাযোগ করুন।",
};

export default function AssessmentPage() {
  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <Stethoscope className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>শারঈ স্ব-নিরীক্ষণ ও গাইডেন্স</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          লক্ষণ ও সমস্যা স্ব-নিরীক্ষণ (Self Assessment)
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          আপনার যে যে লক্ষণগুলো প্রকাশ পাচ্ছে তা টিক দিন। ডায়াগনোসিস সম্পন্ন করার পর আপনি সরাসরি সেই <strong className="text-[#006B5B]">ফলাফলসহ WhatsApp-এ একজন অভিজ্ঞ শারঈ রাক্বীর সাথে যোগাযোগ</strong> করতে পারবেন।
        </p>
      </div>

      {/* Guidelines Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#006B5B]/15 shadow-2xs flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#006B5B] shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600">
            <strong className="text-gray-900 block font-semibold mb-0.5">সতর্কতার সাথে নির্বাচন:</strong>
            যেসব সমস্যা নিয়মিত ঘটে শুধু সেগুলোই টিক দিন।
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#006B5B]/15 shadow-2xs flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600">
            <strong className="text-gray-900 block font-semibold mb-0.5">১-ক্লিকে WhatsApp মেসেজ:</strong>
            ফলাফল বের হলে বাটনে ট্যাপ করলেই পুরো বিস্তারিত মেসেজ সাজানো হয়ে যাবে।
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#006B5B]/15 shadow-2xs flex items-start gap-3">
          <HeartPulse className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600">
            <strong className="text-gray-900 block font-semibold mb-0.5">মেডিকেল পরামর্শ:</strong>
            শারীরিক উপসর্গে অবশ্যই এমবিবিএস ডাক্তারের পরীক্ষাও করাবেন।
          </div>
        </div>
      </div>

      {/* The Symptom Checker Tool */}
      <SymptomChecker />
    </div>
  );
}
