import { SelectProvider, useSelect } from "./select.provider";
import {
  autoPlacement,
  autoUpdate,
  size,
  useFloating,
} from "@floating-ui/react";
import css from "./select.module.css";
import React, { Children, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useClickAway } from "@/hooks";
import { flushSync } from "react-dom";
import { Icon } from "@/components";
const SelectRoot = <ITEM,>({
  closeOnChange = true,
  triggerProps,
  ...props
}: SelectProps<ITEM>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const selectedRef = useRef<HTMLDivElement>(null);
  const setSelectedRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    selectedRef.current = ref.current;
  };
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      autoPlacement({
        padding: 10,
        allowedPlacements: ["bottom", "top"],
        alignment: "start",
        boundary: "clippingAncestors",
        autoAlignment: true,
        rootBoundary: "viewport",
      }),
      size({
        apply({ availableHeight }) {
          flushSync(() => setMaxHeight(availableHeight));
        },
        padding: 10,
      }),
    ],
  });

  const placeholderClassNames = clsx(css.placeholder, { [css.open]: isOpen });
  const scrollAreaClassNames = clsx(css.scrollArea, { [css.open]: isOpen });
  const iconClassNames = clsx(css.icon, { [css.open]: isOpen });
  const ref = useRef(null);

  useClickAway({
    ref,
    onClickAway() {
      setIsOpen(false);
    },
  });

  const computedPlaceholder = useMemo(() => {
    if (!props.value && !props.renderPlaceholder) return props.placeholder;
    if (!props.value && !!props.renderPlaceholder)
      return props.renderPlaceholder();
    const children = Children.toArray(props.children) as unknown as Array<
      React.ReactElement<OptionProps, "option">
    >;
    const selected = children.find((_) => _.props.value == props.value);
    if (!selected) return "";
    if (props.renderValue && props.value) return props.renderValue(props.value);
    return selected.props.children;
  }, [props.placeholder, props.value, props.children]);

  const handleOnChange = (value: ITEM) => {
    if (closeOnChange) {
      setIsOpen(false);
    }
    props.onChange?.(value);
  };

  const handleOnToggle = () => {
    selectedRef.current?.scrollIntoView({
      behavior: "instant",
      block: "nearest",
      inline: "nearest",
    });
    setIsOpen(!isOpen);
  };
  return (
    <SelectProvider
      onChange={handleOnChange}
      value={props.value}
      selectedRef={selectedRef}
      setSelectedRef={setSelectedRef}
    >
      <div
        className={css.container}
        ref={ref}
        style={
          {
            "--max-height": `${maxHeight}px`,
          } as React.CSSProperties
        }
      >
        <button
          {...triggerProps}
          ref={refs.setReference}
          className={placeholderClassNames}
          onClick={handleOnToggle}
        >
          <span className="flex-1">{computedPlaceholder}</span>
          <span className={iconClassNames}>
            <Icon.Primitive>
              <Icon.ChevronDown />
            </Icon.Primitive>
          </span>
        </button>
        <div
          className={scrollAreaClassNames}
          ref={refs.setFloating}
          style={floatingStyles}
        >
          <div className={css.list}>{props.children}</div>
        </div>
      </div>
    </SelectProvider>
  );
};

const SelectItem = (props: OptionProps) => {
  const { onChange, value, setSelectedRef } = useSelect();
  const isSelected = props.value == value;

  const ref = useRef<HTMLDivElement>(null);

  const classNames = clsx(css.item, {
    [css.selected]: isSelected,
    selected: isSelected,
  });
  return (
    <div
      {...props}
      ref={ref}
      className={classNames}
      onClick={() => {
        onChange(props.value);
        setSelectedRef(ref);
      }}
    >
      {props.children}
    </div>
  );
};

const Item = SelectItem;
const Root = SelectRoot;

export { Item, Root };
