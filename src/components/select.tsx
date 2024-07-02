'use client'

import { useMemo } from 'react'
import { SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

type Props = {
  onChange: (value?: string) => void
  onCreate?: (value: string) => void
  options?: Array<{ label: string; value: string }>
  value?: string | null | undefined
  disabled?: boolean
  placeholder?: string
}

export function Select({
  onChange,
  onCreate,
  options = [],
  value,
  disabled = false,
  placeholder = '',
}: Props) {
  function onSelect(option?: SingleValue<{ label: string; value: string }>) {
    onChange(option?.value)
  }

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [options, value])

  return (
    <CreatableSelect
      placeholder={placeholder}
      className="h-10 text-sm"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: '#e2e8f0',
          ':hover': {
            borderColor: '#e2e8f0',
          },
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
      formatCreateLabel={(label) => {
        return <span>Adicionar {label}</span>
      }}
    />
  )
}
