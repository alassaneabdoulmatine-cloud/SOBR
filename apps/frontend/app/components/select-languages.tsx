

import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select"

import i18n from '../routes/i18n'
import { useTranslation } from "react-i18next"

const items = [
    { label: "English", value: "en" },
    { label: "Français", value: "fr" },
]

function getDefaultLanguage() {
    const language = navigator.language.toLowerCase()

    return language.startsWith("fr") ? "fr" : "en"
}

export function LanguageSelect() {
    const [language, setLanguage] = useState(getDefaultLanguage)

    const { t, i18n } = useTranslation()

    return (
        <Select
            value={language}
            onValueChange={(value) => {
                setLanguage(value as string)
                i18n.changeLanguage(value as string)
            }}
        >
            <SelectTrigger className="w-full max-w-48">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>

                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}