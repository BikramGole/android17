import { createElement, type DetailedHTMLProps, type HTMLAttributes, type PropsWithChildren } from 'react'

type MWProps = PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>>

export function MdFilledButton(props: MWProps & { onClick?: () => void }) {
  return createElement('md-filled-button', props, props.children)
}

export function MdOutlinedButton(props: MWProps & { onClick?: () => void }) {
  return createElement('md-outlined-button', props, props.children)
}

export function MdIcon(props: MWProps & { style?: React.CSSProperties; slot?: string }) {
  return createElement('md-icon', props, props.children)
}

export function MdSwitch(props: MWProps & { selected?: boolean; style?: React.CSSProperties }) {
  return createElement('md-switch', props)
}
