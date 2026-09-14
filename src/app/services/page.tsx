import { Metadata } from "next";
import ServicesClientView from "@/components/ServicesClientView";

export const metadata: Metadata = {
  title: "আমাদের সেবাসমূহ ও সেশন ফি | সুন্নাহলাইফ",
  description: "কুরআন ও সহীহ সুন্নাহ মোতাবেক শারঈ রুকইয়াহ ডায়াগনোসিস, জিনের রুকইয়াহ, বদনজরের রুকইয়াহ ও সিহর বিনষ্টকরণ সেশন ফি ও কার্যপ্রণালী।",
};

export default function ServicesPage() {
  return <ServicesClientView />;
}
