import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/AxiosInstance";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If you're using captcha, uncomment this check
    // if (!captchaValue) {
    //   toast.error("Please verify that you are not a robot");
    //   return;
    // }

    setIsSubmitting(true);

    try {
      const res = await axiosInstance.post("/contact", formData);
      toast.success(res.data.message || "Message sent successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setCaptchaValue(null);
    } catch (error) {
      const errMsg = error.response?.data?.error || "Something went wrong. Try again later.";
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto shadow-lg">
      {/* Left sidebar */}
      <div className="bg-green-700 text-white p-8 md:w-2/5">
        <h1 className="text-3xl font-bold mb-6">Please Contact Us:</h1>

        <div className="mb-6">
          <p className="font-semibold">Address:</p>
          <p>Acewall Scholars</p>
          <p>P.O. Box 445</p>
          <p>Powhatan, VA 23139</p>
        </div>

        <div className="mb-6">
          <p className="font-semibold">Phone Number:</p>
          <a href="tel:8044647926" className="text-green-300 hover:underline">
            (804) 464-7926
          </a>
        </div>

        <div>
          <p className="font-semibold mb-3">Follow Us</p>
          <div className="flex space-x-2">
            {[Mail, Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="bg-green-600 p-2 rounded-full hover:bg-green-500 transition-colors"
              >
                <Icon size={20} />
                <span className="sr-only">{Icon.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="p-8 md:w-3/5 bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name *</label>
          <Input
            name="name "
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe "
            required
            className="border-gray-300 focus:border-green-500"
          />
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Email *</label>

          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="johndoe001@gmail.com"
            required
            className="border-gray-300 focus:border-green-500"
          />
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Phone</label>

          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            placeholder="(123) 456-7890"
            className="border-gray-300 focus:border-green-500"
          />
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Subject *</label>

          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="border-gray-300 focus:border-green-500"
          />
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Message *</label>

          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            required
            className="min-h-[120px] border-gray-300 focus:border-green-500"
          />

          {/* Uncomment this block if you're using ReCAPTCHA */}
          {/* 
          <div className="py-2">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleCaptchaChange}
            />
          </div> 
          */}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3"
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
          </Button>
        </form>
      </div>
    </div>
  );
}
