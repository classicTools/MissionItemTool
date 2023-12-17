import React, { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, Ref, RefObject, memo, useEffect, useRef, useState } from 'react'
import styled, { FlattenSimpleInterpolation, css } from 'styled-components'

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: any, callback: Function) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
}

interface Item {
    label: string
    value: any
    [x: string]: unknown
}

interface GenericStyle {
    width: number
    customCSS?: FlattenSimpleInterpolation
}
const ACWrapper = styled.div``
const ACInput = styled.input<GenericStyle>`
    width: ${(props) => props.width + 2}px;
    height: 20px;

    ${(props) => props.customCSS}
`
const ACList = styled.div<GenericStyle>`
    border: 1px;
    z-index: 20;
    position: absolute;
    max-height: 200px;

    ${(props) => props.customCSS}
`

interface ACItemProps extends GenericStyle {
    highlighted: boolean
}
const ACItem = styled.div<ACItemProps>`
    background: ${(props) => (props.highlighted ? 'lightgray' : 'white')};
    width: ${(props) => props.width}px;
    height: 20px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    cursor: pointer;

    ${(props) => props.customCSS}
`
const defaultWidth = 200
const defaultItemHeight = 30

const AutocompleteItem = ({ value, onSelect, onMouseOver, highlighted, width = defaultWidth, height = defaultItemHeight, customCSS = css`` }: any) => {
    return (
        <ACItem
            highlighted={highlighted}
            onMouseOver={onMouseOver}
            onClick={onSelect}
            className={'autocompleteItem '}
            key={value}
            width={width}
            customCSS={customCSS}
        >
            {value}
        </ACItem>
    )
}

interface AutocompleteProps {
    label?: string
    placeholder?: string
    classes?: string
    width?: number
    height?: number
    menuHeight?: number
    items: Item[]
    value?: string
    onlyAllowItemFromDropDown: boolean

    onInputChange?: ChangeEventHandler<HTMLInputElement>
    onSelect?: (value: Item) => void
    onKeyUp?: (value: Item) => void
    onFocus?: (value: Item) => void
    onBlur?: () => void

    ACref?: RefObject<HTMLInputElement> | null

    customInputCSS?: FlattenSimpleInterpolation
    customListCSS?: FlattenSimpleInterpolation
    customItemCSS?: FlattenSimpleInterpolation
}
const Autocomplete = ({
    label = '',
    onInputChange = () => {},
    onSelect = () => {},
    onKeyUp = () => {},
    onFocus = () => {},
    onBlur = () => {},
    value,
    onlyAllowItemFromDropDown = false,
    classes = '',
    ACref = null,
    items = [],
    placeholder = '',

    width = defaultWidth,
    customInputCSS = css``,
    customListCSS = css``,
    customItemCSS = css``,
}: AutocompleteProps) => {
    const [hideMenu, setHideMenu] = useState<boolean>(true)
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const shownItems = items.filter((item) => item.label.includes(value ?? ''))

    useOutsideAlerter(ACref ?? inputRef, () => {
        onBlur()
        setHideMenu(true)
    })
    const _onFocus: FocusEventHandler<HTMLInputElement> = (e) => {
        setHideMenu(false)
    }

    const _onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        onInputChange(e)
    }

    const _onSelect = (item: Item) => {
        onSelect(item)
        setHideMenu(true)
    }
    const _onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        let moveDownBy = 0
        if (e.key === 'ArrowDown') {
            moveDownBy = 1
        } else if (e.key === 'ArrowUp') {
            moveDownBy = -1
        } else if (e.key === 'Enter') {
            if (shownItems.length && typeof highlightedIndex === 'number') {
                onSelect(shownItems[highlightedIndex])
            }
        } else {
            setHighlightedIndex(null)
            return
        }

        if (moveDownBy) {
            if (typeof highlightedIndex === 'number') {
                let i = highlightedIndex + moveDownBy
                if (i > shownItems.length - 1) i = i - shownItems.length
                else if (i < 0) i = shownItems.length - 1

                setHighlightedIndex(i)
            } else {
                setHighlightedIndex(0)
            }
        }
    }
    const _onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        setHideMenu(true)
    }

    return (
        <ACWrapper ref={ACref ?? inputRef}>
            {label && <label>{label}: </label>}
            <div className={classes}>
                <ACInput
                    ref={ACref ?? inputRef}
                    value={value}
                    onChange={_onChange}
                    onFocus={_onFocus}
                    onKeyDown={_onKeyDown}
                    className="autocompleteInput"
                    placeholder={placeholder}
                    width={width}
                    customCSS={customInputCSS}
                ></ACInput>
                {!hideMenu && (
                    <ACList width={width} customCSS={customListCSS}>
                        {shownItems.map((item, index) => {
                            let value = item.label
                            return (
                                <AutocompleteItem
                                    key={value}
                                    value={value}
                                    onSelect={() => _onSelect(item)}
                                    highlighted={highlightedIndex === index}
                                    onMouseOver={() => setHighlightedIndex(index)}
                                    width={width}
                                    customCSS={customItemCSS}
                                />
                            )
                        })}
                    </ACList>
                )}
            </div>
        </ACWrapper>
    )
}
export default Autocomplete
