import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto py-12">
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          سياسة الخصوصية
        </motion.h1>
        <p className="mb-4 text-muted-foreground">
          نحن في SmartCalc Plus نحترم خصوصيتك. نحن نستخدم خدمات إعلانات من طرف ثالث (مثل Google AdSense)
          والتي قد تستخدم ملفات تعريف الارتباط (Cookies) لعرض الإعلانات بناءً على زياراتك السابقة لمواقع أخرى.
        </p>
        <p className="mb-4 text-muted-foreground">
          يمكنك تعطيل استخدام ملفات تعريف الارتباط للإعلانات المخصصة عبر{' '}
          <a
            href="https://www.google.com/settings/ads"
            className="text-primary underline"
            target="_blank"
            rel="noreferrer"
          >
            إعدادات Google
          </a>.
        </p>
        <p className="mb-4 text-muted-foreground">
          لمزيد من المعلومات، يرجى مراجعة{' '}
          <a
            href="https://policies.google.com/technologies/ads"
            className="text-primary underline"
            target="_blank"
            rel="noreferrer"
          >
            سياسات Google الإعلانية
          </a>.
        </p>
      </div>
    </div>
  );
}
