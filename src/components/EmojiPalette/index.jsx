import React, { useRef, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import shortid from 'shortid';
import Image from '../Image';
import Selector, { Palette, Emoji } from './EmojiPalette.styled';

export const EMOJIS_PALETTE_OPTIONS = {
  emojis_data: {
    '\uD83D\uDC4F': {
      enabled: true,
      id: '2f26f82b-fbcb-11ea-bdd5-0215b6e3dd02'
    },
    '\uD83D\uDE4C': {
      enabled: true,
      id: '9ae29f3b-fbcb-11ea-bdd5-0215b6e3dd02'
    },
    '\uD83D\uDE4F': {
      enabled: true,
      id: '11587024-fbcc-11ea-bdd5-0215b6e3dd02'
    },
    '\uD83D\uDC4D': {
      enabled: true,
      id: '115d1b66-fbcc-11ea-bdd5-0215b6e3dd02'
    },
    '\uD83D\uDE80': {
      enabled: true,
      id: '11613a08-fbcc-11ea-bdd5-0215b6e3dd02'
    },
    '\uD83D\uDD25': {
      enabled: true,
      id: '1165560c-fbcc-11ea-bdd5-0215b6e3dd02'
    },
    '\uD83C\uDF89': {
      enabled: true,
      id: '1169bc22-fbcc-11ea-bdd5-0215b6e3dd02'
    }
  }
};

const EmojiPalette = props => {
  const {
    paletteHeight,
    paletteDistanceFromSelector,
    selectorImageUrlPaletteClosed,
    selectorImageUrlPaletteOpened,
    currentInputValue,
    inputContainerRef
  } = props;
  const selectorRef = useRef(null);
  const paletteRef = useRef(null);
  const [inputValue, setInputValue] = useState(
    currentInputValue
  ); /* used to recalculate the palette position */
  const [renderSmallerVersion, setRenderSmallerVersion] = useState(false);
  const [paletteRight, setPaletteRight] = useState(null);
  const [paletteTop, setPaletteTop] = useState(null);
  const [paletteState, setPaletteState] = useState(false);

  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth < 379) setRenderSmallerVersion(true);
    else setRenderSmallerVersion(false);
    const resizeListener = () => {
      if (innerWidth < 379) setRenderSmallerVersion(true);
      else setRenderSmallerVersion(false);
    };
    window.addEventListener('resize', resizeListener, true);
    return () => window.removeEventListener('resize', resizeListener, true);
  }, []);

  useEffect(() => {
    const listener = e => {
      if (paletteState && e.target !== paletteRef.current) {
        setPaletteState(false);
      }
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  });

  const setPalettePosition = () => {
    const { innerWidth } = window;
    const selectorCoordinates = selectorRef.current.getBoundingClientRect();
    setPaletteRight(
      innerWidth - (selectorCoordinates.x + selectorCoordinates.width)
    );
    setPaletteTop(
      selectorCoordinates.y - paletteHeight - paletteDistanceFromSelector
    );
  };

  useEffect(() => {
    if (currentInputValue && !inputValue) {
      setPalettePosition();
      setInputValue(currentInputValue);
    }
    if (!currentInputValue && inputValue) {
      setPalettePosition();
      setInputValue(currentInputValue);
    }
  }, [currentInputValue]);

  const openEmojiPalette = () => {
    setPalettePosition();
    setPaletteState(true);
  };

  const onChange = emoji => {
    if (inputContainerRef && inputContainerRef.current) {
      const originalCurrentCursorStart =
        inputContainerRef.current.selectionStart;
      const originalCurrentCursorEnd = inputContainerRef.current.selectionEnd;
      let currentCursorStart = originalCurrentCursorStart;
      let currentCursorEnd = originalCurrentCursorEnd;
      const mentionRegex = /\/\/~\[(\w|\d|\s|\$_-)*\]\((\w|\d|\s|-)*\)~\/\//g;
      const mentionNameRegex = /\[(\w|\d|\s|\$_-)*\]/;
      let match;
      let originalString = currentInputValue;
      const mentionPositions = [];
      /* Find all the matching mentions */
      match = originalString.match(mentionRegex);
      while (match && match.length) {
        const matchPosition = originalString.indexOf(match[0]);
        const matchingNameWrapper = match[0].match(mentionNameRegex)[0];
        const matchingName = matchingNameWrapper.substring(
          1,
          matchingNameWrapper.length - 1
        );
        /* Generate the string with only names (as shown in the UI) */
        const mentionString = '@'.concat(matchingName);
        originalString = originalString.replace(match[0], mentionString);
        /* mentionPositions will store the relative position of each mention */
        mentionPositions.push({
          start: matchPosition,
          end: matchPosition + mentionString.length,
          lengthDiff: match[0].length - mentionString.length
        });
        match = originalString.match(mentionRegex);
      }
      let isIllegalOperation = false;
      mentionPositions.forEach(position => {
        if (
          (originalCurrentCursorStart > position.start &&
            originalCurrentCursorStart < position.end) ||
          (originalCurrentCursorEnd > position.start &&
            originalCurrentCursorEnd < position.end)
        )
          isIllegalOperation = true;
        /*  Increase the current cursor values to match the actual mention string value type
          i.e., @Rohan Joshi is equivalent to //~[Rohan Joshi](d09eb701-48s1-420d-9f5d-00a2ec84f683)~//
        */
        if (position.end <= originalCurrentCursorStart)
          currentCursorStart += position.lengthDiff;
        if (position.end <= originalCurrentCursorEnd)
          currentCursorEnd += position.lengthDiff;
      });
      /* Don't allow insertion of emojis in between mentions */
      if (isIllegalOperation) return;
      const currentInputValueLeft = currentInputValue.substr(
        0,
        currentCursorStart
      );
      const currentInputValueRight = currentInputValue.substr(
        currentCursorEnd,
        currentInputValue.length
      );
      const emojiLeftPadding =
        currentInputValueLeft && !currentInputValueLeft.endsWith(' ')
          ? ' '
          : '';
      const emojiRightPadding =
        currentInputValueRight && !currentInputValueRight.startsWith(' ')
          ? ' '
          : '';
      props.onChange({
        target: {
          value: currentInputValueLeft
            .concat(emojiLeftPadding)
            .concat(emoji)
            .concat(emojiRightPadding)
            .concat(currentInputValueRight)
        }
      });
      inputContainerRef.current.focus();
    } else {
      props.onChange({
        target: {
          value: currentInputValue
            .concat(currentInputValue ? ' ' : '')
            .concat(emoji)
        }
      });
    }
  };

  const onClick = emoji => {
    props.onClick(emoji);
  };

  const PALETTE_OPTIONS = Object.keys(EMOJIS_PALETTE_OPTIONS.emojis_data)
    .filter(emoji => EMOJIS_PALETTE_OPTIONS.emojis_data[emoji].enabled)
    .map((emoji, index) => (
      <Emoji
        id={`emoji${index}`}
        key={shortid.generate()}
        onClick={() => {
          onChange(emoji);
          onClick(emoji);
          // if (props.actionType === 'emoji')
          // analytics.trackEvent(AnalyticsCategory.cta_click, `emoji_${emoji}`);
        }}
      >
        <span>{emoji}</span>
      </Emoji>
    ));

  return (
    <div>
      <Selector
        id="emojiContainer"
        {...props}
        onClick={openEmojiPalette}
        ref={selectorRef}
      >
        <Image
          alt="reaction"
          className="emojiIcon"
          src={
            paletteState
              ? selectorImageUrlPaletteOpened
              : selectorImageUrlPaletteClosed
          }
        />
      </Selector>
      <Palette
        open={paletteState}
        ref={paletteRef}
        renderSmallerVersion={renderSmallerVersion}
        right={paletteRight}
        top={paletteTop}
      >
        {PALETTE_OPTIONS}
      </Palette>
    </div>
  );
};

EmojiPalette.propTypes = {
  selectorImageUrlPaletteClosed: PropTypes.string,
  selectorImageUrlPaletteOpened: PropTypes.string,
  selectorPosition: PropTypes.string,
  selectorBackground: PropTypes.string,
  selectorHoverBackground: PropTypes.string,
  selectorTop: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  selectorRight: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  selectorBottom: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  selectorLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  selectorHeight: PropTypes.number,
  selectorWidth: PropTypes.number,
  selectorPadding: PropTypes.number,
  actionType: PropTypes.oneOf(['emoji', 'reactions']),
  paletteHeight: PropTypes.number,
  paletteDistanceFromSelector: PropTypes.number,
  currentInputValue: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  inputContainerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

EmojiPalette.defaultProps = {
  selectorImageUrlPaletteClosed: '/assets/images/emoji-palette-close.svg',
  selectorImageUrlPaletteOpened: '/assets/images/emoji-palette-open.svg',
  selectorPosition: 'absolute',
  selectorBackground: 'base_100',
  selectorHoverBackground: 'highlights_blue',
  selectorTop: null,
  selectorRight: 10,
  selectorBottom: 7,
  selectorLeft: null,
  selectorHeight: 30,
  selectorWidth: 30,
  selectorPadding: 7,
  actionType: 'emoji',
  paletteHeight: 56 /* palette  height is including padding, i.e, 8px */,
  paletteDistanceFromSelector: 3,
  currentInputValue: '',
  onChange: () => {},
  onClick: () => {},
  inputContainerRef: null
};

export default EmojiPalette;
