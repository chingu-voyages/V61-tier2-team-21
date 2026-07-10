import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--accent-secondary)",
          "--normal-text": "var(--light-primary)",
          "--normal-border": "var(--color-light-primary)",
          "--border-radius": "25px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "flex-col items-center justify-center rounded-[25px] border border-light-primary bg-accent-secondary px-10 py-[45px]",
          title: "text-center sm:text-sm md:text-lg lg:text-xl leading-6 ",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
