const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`w-[96%] mx-auto ${className}`}>{children}</div>;
};

export default Container;
