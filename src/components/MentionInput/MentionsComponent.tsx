import React, { useContext } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { GlobalContext } from '../../context/Provider';
import { defaultMentionInputsStyle, defaultMentionStyle } from './defaultMentionStyle';

interface MentionsComponentProps {
  text: string;
  onChange: Function;
  mode?: string;
  inputStyle?: React.CSSProperties;
  placeholder?: string;
}

const MentionsComponent: React.FC<MentionsComponentProps> = ({
  text,
  onChange,
  mode,
  inputStyle,
  placeholder = "Type your reply here",
}) => {
  const globalStore: any = useContext(GlobalContext)
  return (
    <MentionsInput
      value={text}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...(defaultMentionInputsStyle as React.CSSProperties),
        ...(mode === 'replyMode' || mode === 'editMode'
          ? globalStore.replyInputStyle
          : globalStore.inputStyle || inputStyle)
      }}
      className='postComment'
      placeholder={placeholder}
      a11ySuggestionsListLabel='Suggested mentions'
    >
      <Mention
        markup="@[__display__]"
        displayTransform={(_id, display) => display}
        trigger='@'
        data={globalStore.mentionSuggestions}
        style={defaultMentionStyle}
        renderSuggestion={(
          _suggestion,
          _search,
          highlightedDisplay
        ) => <div>{highlightedDisplay}</div>}
        appendSpaceOnAdd
      />
    </MentionsInput>
  );
};

export default MentionsComponent;
