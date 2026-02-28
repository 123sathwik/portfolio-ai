import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    icon?: React.ReactNode;
    multiline?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, icon, multiline, ...props }) => {
    const InputComponent = multiline ? 'textarea' : 'input';

    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">
                {label}
            </label>
            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-4 text-muted group-focus-within:text-primary transition-colors">
                        {icon}
                    </div>
                )}
                <InputComponent
                    {...(props as any)}
                    className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 ${icon ? 'pl-12' : 'pl-4'
                        } pr-4 outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all text-sm placeholder:text-muted/50 ${multiline ? 'min-h-[120px] resize-none' : ''
                        }`}
                />
            </div>
        </div>
    );
};

export default FormInput;
