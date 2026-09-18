import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContact('');
    }, 4000);
  };

  return (
    <section className="bg-[#FBF9F4]" id="newsletter">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="border border-[#EBE5DA] rounded-xl p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-md">
            <h2 className="font-headline text-[20px] sm:text-[24px] font-bold text-[#211F1C]">
              Get new stock alerts first
            </h2>
            <p className="font-body text-sm text-[#58554F] mt-1.5 leading-relaxed">
              Wooden puzzles and die-cast cars sell out fast — WhatsApp or email, your choice.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#EBF7EE] border border-[#258547]/30 px-5 py-3.5 rounded-lg flex items-center gap-2 text-[#211F1C] font-headline text-sm font-bold shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#258547] shrink-0" />
              Shukriya! You're on the list.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:max-w-sm">
              <div className="flex-1">
                <label htmlFor="newsletter-contact-input" className="sr-only">
                  WhatsApp number or email
                </label>
                <input
                  id="newsletter-contact-input"
                  type="text"
                  placeholder="03XX-XXXXXXX or you@email.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-[#211F1C] placeholder-[#58554F]/60 rounded-lg text-sm font-body border border-[#EBE5DA] outline-none focus:border-[#0F3D9C] focus:border-2 min-h-[44px]"
                />
              </div>
              <button type="submit" className="btn-primary px-6 py-3 cursor-pointer" id="newsletter-submit-btn">
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
