import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Twitter, 
  Linkedin,
  Clock,
  Globe,
  Heart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// import AdBanner from '@/components/AdBanner'; // Temporarily disabled (AdSense approval pending)

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Contact - Tayeb',
    description: 'Get in touch directly via email',
    contact: 'tayebekk2004@gmail.com',
    action: 'Send Email',
    color: 'text-blue-500',
    onClick: () => window.location.href = 'mailto:tayebekk2004@gmail.com'
  },
  {
    icon: Mail,
    title: 'Email Contact - Ilyes',
    description: 'Alternative email contact',
    contact: 'ilyesbakkar44@gmail.com',
    action: 'Send Email',
    color: 'text-green-500',
    onClick: () => window.location.href = 'mailto:ilyesbakkar44@gmail.com'
  },
  {
    icon: Linkedin,
    title: 'LinkedIn - Tayeb',
    description: 'Connect professionally',
    contact: 'linkedin.com/in/tayebbekkouche',
    action: 'Open LinkedIn',
    color: 'text-[#0077B5]',
    onClick: () => window.open('https://www.linkedin.com/in/tayebbekkouche', '_blank')
  },
{
  icon: Linkedin,
  title: 'LinkedIn - Ilyes',
  description: 'Connect professionally',
  contact: 'linkedin.com/in/ilyes-bkr',
  action: 'Open LinkedIn',
  color: 'text-[#28a745]',
  onClick: () => window.open('https://linkedin.com/in/ilyes-bkr-7a3ba6304', '_blank')
},
];

const socialLinks = [
  { 
    icon: Linkedin, 
    label: 'LinkedIn - Tayeb', 
    href: 'https://www.linkedin.com/in/tayebbekkouche', 
    color: 'hover:text-[#0077B5]',
    onClick: () => window.open('https://www.linkedin.com/in/tayebbekkouche', '_blank')
  },
{ 
  icon: Linkedin, 
  label: 'LinkedIn - Ilyes', 
  href: 'https://linkedin.com/in/ilyes-bkr-7a3ba6304', 
  color: 'hover:text-[#28a745]',
  onClick: () => window.open('https://linkedin.com/in/ilyes-bkr-7a3ba6304', '_blank')
},
  { 
    icon: Mail, 
    label: 'Email - Tayeb', 
    href: 'mailto:tayebekk2004@gmail.com', 
    color: 'hover:text-red-500',
    onClick: () => {
      navigator.clipboard.writeText('tayebekk2004@gmail.com');
      alert('Email copied to clipboard!');
    }
  },
  { 
    icon: Mail, 
    label: 'Email - Ilyes', 
    href: 'mailto:ilyesbakkar44@gmail.com', 
    color: 'hover:text-green-500',
    onClick: () => {
      navigator.clipboard.writeText('ilyesbakkar44@gmail.com');
      alert('Email copied to clipboard!');
    }
  },
];

const officeInfo = [
  { icon: MapPin, label: 'University', value: 'USTO-MB, Oran - Département d\'Informatique' },
  { icon: Clock, label: 'Availability', value: 'Monday - Friday: 9 AM - 6 PM' },
  { icon: Globe, label: 'Platform', value: 'SmartCalc+ Educational Platform' },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Contact form test utilities (disabled by default)
  const urlParams = new URLSearchParams(window.location.search);
  const showTestButton = urlParams.has('test');
  const autoTest = urlParams.has('autotest');

  const [isTesting, setIsTesting] = useState(false);
  const sendTestEmail = async () => {
    try {
      setIsTesting(true);
      const res = await fetch('https://formsubmit.co/ajax/tayebekk2004@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: 'SmartCalc+ Test',
          email: 'no-reply@smartcalc.app',
          subject: 'Test email from Contact form',
          message: 'This is a test to confirm that FormSubmit integration works.',
          _subject: '[SmartCalc+] Test email',
          _template: 'table',
          _captcha: 'false'
        })
      });
      if (!res.ok) throw new Error('Failed to send test email');
      toast({ title: 'Test envoyé ✅', description: 'Vérifiez votre boîte mail.' });
    } catch (e) {
      toast({ title: 'Erreur test', description: "Échec de l'envoi du test.", variant: 'destructive' });
    } finally {
      setIsTesting(false);
    }
  };

  useEffect(() => {
    if (autoTest) {
      sendTestEmail();
    }
  }, [autoTest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Send via FormSubmit (lightweight, no backend required)
      const res = await fetch('https://formsubmit.co/ajax/tayebekk2004@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `[SmartCalc+] ${formData.subject}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (!res.ok) throw new Error('Failed to send');

      setFormData({ name: '', email: '', subject: '', message: '' });
      toast({ title: 'Message envoyé ✅', description: "Nous vous répondrons bientôt." });
    } catch (err) {
      toast({ title: 'Erreur', description: "L'envoi a échoué. Ouverture de votre client e-mail…", variant: 'destructive' });
      const subject = encodeURIComponent(`[SmartCalc+] ${formData.subject}`);
      const body = encodeURIComponent(`From: ${formData.name} <${formData.email}>\n\n${formData.message}`);
      window.location.href = `mailto:tayebekk2004@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions, suggestions, or need help? We're here to support your learning journey. 
            Reach out through any of the channels below.
          </p>
        </motion.div>

        {showTestButton && (
          <div className="text-center -mt-8 mb-8">
            <Button variant="outline" onClick={sendTestEmail} disabled={isTesting}>
              {isTesting ? 'Sending test…' : 'Send Test Email'}
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="p-8">
              <div className="flex items-center space-x-2 mb-6">
                <Send className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your question or feedback..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                >
<Card className="p-4 hover:shadow-elegant transition-smooth cursor-pointer" onClick={method.onClick} role="button" tabIndex={0}>
  <div className="flex items-start space-x-3">
    <method.icon className={`w-6 h-6 ${method.color} mt-1`} />
    <div className="flex-1">
      <h3 className="font-semibold mb-1">{method.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">
        {method.description}
      </p>
      <a href={method.contact.startsWith('http') ? method.contact : `https://${method.contact}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline inline-flex items-center gap-2">
        <Linkedin className="w-4 h-4" /> {method.contact}
      </a>
    </div>
  </div>
</Card>
                </motion.div>
              ))}
            </div>

            {/* Office Information */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Office Information</h3>
              <div className="space-y-3">
                {officeInfo.map((info, index) => (
                  <div key={info.label} className="flex items-start space-x-3">
                    <info.icon className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{info.label}</div>
                      <div className="text-sm text-muted-foreground">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                 {socialLinks.map((social, index) => (
                   <motion.button
                     key={social.label}
                     onClick={social.onClick}
                     className={`p-3 rounded-lg bg-muted/50 text-muted-foreground transition-smooth ${social.color} hover:bg-muted`}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     <social.icon className="w-5 h-5" />
                   </motion.button>
                 ))}
              </div>
                 <p className="text-sm text-muted-foreground mt-4">
                   Get in touch through any of these platforms. Email will be copied to clipboard.
                 </p>
            </Card>

            {/* Support Hours */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">We're Here to Help</h3>
              </div>
               <p className="text-sm text-muted-foreground">
                 SmartCalc+ is designed for LMD students at USTO-MB University, but all CS students can benefit from our platform.
                 Feel free to reach out for questions or suggestions!
               </p>
            </Card>
          </motion.div>
        </div>

        {/* Ads disabled (pending AdSense approval)
        <div className="mt-12">
          <AdBanner />
        </div>
        */}
      </div>
    </div>
  );
};