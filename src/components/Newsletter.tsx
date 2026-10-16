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
    <section className="bg-[#F6F3EC]" id="newsletter">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="border-[1.5px] border-[#182232] rounded-[6px] p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-[0px_3px_0px_#182232]">
          <div className="max-w-md">
            <h2 className="font-headline text-[20px] sm:text-[24px] font-extrabold text-[#182232] tracking-[-0.03em]">
              Drop alerts for retired sets &amp; restocks.
            </h2>
            <p className="font-body text-sm text-[#5A6270] mt-1.5 leading-relaxed">
              WhatsApp or email. Zero spam — only when something you care about lands back on the shelf.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#EDE8DD] border-[1.5px] border-[#182232] px-5 py-3.5 rounded-[6px] flex items-center gap-2 text-[#182232] font-headline text-sm font-bold shrink-0">
              <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-[#E84A27] shrink-0" />
              You're on the list. Shukriya.
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
                  className="w-full px-4 py-3 bg-[#EDE8DD] text-[#182232] placeholder-[#5A6270]/60 rounded-[6px] text-sm font-body border-[1.5px] border-[#182232] outline-none focus:border-[#E84A27] min-h-[44px]"
                />
              </div>
              <button type="submit" className="btn-primary px-6 py-3 cursor-pointer" id="newsletter-submit-btn">
                Get alerts
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
