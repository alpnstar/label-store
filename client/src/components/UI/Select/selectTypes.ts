export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export interface SelectState {
    isOpen: boolean;
    selectedOption: SelectOption[] | null;
}