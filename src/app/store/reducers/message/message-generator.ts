import uuid from 'uuid';
import { IPicktusError, IPicktusMessage, PicktusMessageDisplay, PicktusMessageLevel } from './message.type';

export default function(
  text: string,
  level: PicktusMessageLevel,
  display: PicktusMessageDisplay
): IPicktusError | IPicktusMessage {
  return {
    display,
    id: uuid.v4(),
    level,
    text,
  };
}
