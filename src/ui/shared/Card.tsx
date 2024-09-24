import * as React from 'react';

const Card = React.forwardRef<
    HTMLDivElement,
    React.HtmlHTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    <div
        ref={ref}
        className={`rounded-xl border bg-stone-100 text-customBlue shadow-md ${className}`}
        {...props}
    ></div>;
});
