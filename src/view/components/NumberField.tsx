import { useState } from 'react';
import { NumberInput, type NumberInputProps } from '@mantine/core';

type NumberFieldProps = Omit<NumberInputProps, 'value' | 'onChange'> & {
    value: number;
    onChange: (value: number) => void;
};

// NumberInput that shows exactly what is typed while focused (including partial input
// like '', '-' or '1.0') and only reports complete numbers. On blur it shows the stored
// value again, so a field left empty reverts to its previous value.
export function NumberField({ value, onChange, onBlur, ...props }: NumberFieldProps) {
    const [draft, setDraft] = useState<string | number | null>(null);

    return (
        <NumberInput
            {...props}
            value={draft ?? value}
            onChange={(v) => {
                setDraft(v);
                if (typeof v === 'number') onChange(v);
            }}
            onBlur={(e) => {
                setDraft(null);
                onBlur?.(e);
            }}
        />
    );
}
