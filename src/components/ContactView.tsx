import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Building2, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { config } from '../config';
import { ShopNumbers } from './ShopNumbers';
import { WhatsAppLink } from './WhatsAppLink';
import { WHATSAPP_HELP_MESSAGE } from '../lib/whatsapp';

/**
 * Wholesale / brand inquiry page — Formspree xqpenkga.
 * Order checkout uses a separate form (mrpejgyd).
 */
export const ContactView: React.FC = () => {
  const [state, handleSubmit] = useForm(config.contactFormId);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14" id="contact-page">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <p className="font-mono text-[11px] font-medium text-[#E84A27] tracking-[0.05em] uppercase">
              Contact us
            </p>
            <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#182232] mt-2 tracking-[-0.03em]">
              Wholesale &amp; brand inquiries
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#5A6270] leading-relaxed">
              We have been sourcing toys for wholesalers for more than 10 years. Tell us what you
              need and we will get back to you.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-[#182232]">
            <li className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-[#E84A27] mt-0.5 shrink-0" aria-hidden="true" />
              <span>10+ years supplying wholesalers across Pakistan</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#E84A27] mt-0.5 shrink-0" aria-hidden="true" />
              <a href={`mailto:${config.email}`} className="hover:text-[#E84A27] break-all">
                {config.email}
              </a>
            </li>
          </ul>

          <ShopNumbers linkClassName="hover:text-[#E84A27] transition-colors" />

          <WhatsAppLink
            message={WHATSAPP_HELP_MESSAGE}
            className="inline-flex max-w-full flex-wrap items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-sm font-bold px-5 py-3 rounded-[6px] border-[1.5px] border-[#182232] shadow-[0px_3px_0px_#182232]"
            id="contact-whatsapp"
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" aria-hidden="true" />
            <span className="min-w-0 break-words">WhatsApp {config.whatsappPhone}</span>
          </WhatsAppLink>

          <p className="text-xs text-[#5A6270]">
            Retail shoppers: place orders through checkout on the site. This form is for
            wholesale and partnership only.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white border border-[#DCD7CC] rounded-[6px] p-5 sm:p-8 shadow-[0px_3px_0px_#182232]">
            {state.succeeded ? (
              <div className="flex flex-col items-center text-center py-10 gap-3" role="status">
                <CheckCircle2 className="w-10 h-10 text-[#25D366]" aria-hidden="true" />
                <h2 className="font-headline text-xl font-bold text-[#182232]">Message sent</h2>
                <p className="text-sm text-[#5A6270] max-w-sm">
                  Thanks — we received your inquiry and will reply at the email or phone you shared.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <input type="hidden" name="_subject" value="A & S Toys wholesale inquiry" />

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-headline font-bold text-[#182232] mb-1">
                    Your name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#DCD7CC] bg-[#F6F3EC] text-sm outline-none focus:border-[#182232]"
                    placeholder="Business or contact name"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-[11px] text-[#E84A27] mt-1" />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-headline font-bold text-[#182232] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#DCD7CC] bg-[#F6F3EC] text-sm outline-none focus:border-[#182232]"
                    placeholder="0314 3814591"
                  />
                  <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-[11px] text-[#E84A27] mt-1" />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-headline font-bold text-[#182232] mb-1">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#DCD7CC] bg-[#F6F3EC] text-sm outline-none focus:border-[#182232]"
                    placeholder="you@business.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-[11px] text-[#E84A27] mt-1" />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-headline font-bold text-[#182232] mb-1">
                    What are you looking for? *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#DCD7CC] bg-[#F6F3EC] text-sm outline-none focus:border-[#182232] resize-y"
                    placeholder="Categories, quantities, city, and any brand preferences…"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-[11px] text-[#E84A27] mt-1" />
                </div>

                <ValidationError errors={state.errors} className="text-sm font-bold text-[#E84A27]" />

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="btn-primary w-full py-3.5 cursor-pointer disabled:opacity-50"
                  id="contact-submit"
                >
                  {state.submitting ? 'Sending…' : 'Send wholesale inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
