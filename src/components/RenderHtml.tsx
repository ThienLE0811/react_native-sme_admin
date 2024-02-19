import React from 'react';
import {useWindowDimensions} from 'react-native';
// import {htmlWithBr} from '../utils';
import {RenderHTML} from 'react-native-render-html';
type DangerouslySetInnerHtmlProps = {
  content: string;
  styles?: React.CSSProperties;
  isLink?: boolean;
  isTitle?: boolean;
};

export function htmlWithBr(content: string) {
  const value = content.length === 9 ? '-' : content.replace(/\n/g, '<br>');

  return value;
}

const RenderHtml: React.FC<DangerouslySetInnerHtmlProps> = ({
  content,
  isTitle,
}) => {
  const {width} = useWindowDimensions();
  const source = {
    html: content,
  };

  return isTitle ? (
    <RenderHTML source={source} contentWidth={width} />
  ) : (
    <RenderHTML source={source} contentWidth={width} />
  );
};

export default RenderHtml;
