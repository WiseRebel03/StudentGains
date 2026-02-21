import React, { useRef } from 'react';
import './OtpInput.css';

const OtpInput = ({ value = '', onChange, length = 6 }) => {
    const inputsRef = useRef([]);
    const digits = Array.from({ length }, (_, i) => value[i] || '');

    const handleChange = (e, idx) => {
        const val = e.target.value.replace(/\D/g, '');
        if (!val) return;
        const lastChar = val[val.length - 1];
        const newDigits = [...digits];
        newDigits[idx] = lastChar;
        onChange(newDigits.join(''));
        if (idx < length - 1 && lastChar) {
            inputsRef.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace') {
            const newDigits = [...digits];
            if (digits[idx]) {
                newDigits[idx] = '';
                onChange(newDigits.join(''));
            } else if (idx > 0) {
                newDigits[idx - 1] = '';
                onChange(newDigits.join(''));
                inputsRef.current[idx - 1]?.focus();
            }
        }
        if (e.key === 'ArrowLeft' && idx > 0) inputsRef.current[idx - 1]?.focus();
        if (e.key === 'ArrowRight' && idx < length - 1) inputsRef.current[idx + 1]?.focus();
    };

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        if (pasted) {
            onChange(pasted.padEnd(length, '').slice(0, length));
            inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
        }
        e.preventDefault();
    };

    return (
        <div className="otp-input-group" onPaste={handlePaste}>
            {digits.map((digit, i) => (
                <input
                    key={i}
                    ref={el => inputsRef.current[i] = el}
                    className="otp-digit"
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(e, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                    onFocus={e => e.target.select()}
                    aria-label={`OTP digit ${i + 1}`}
                />
            ))}
        </div>
    );
};

export default OtpInput;
