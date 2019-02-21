import messageGenerator from './message-generator';
import { PicktusMessageDisplay, PicktusMessageLevel } from './message.type';
import uuid from 'uuid';

describe('message-generator', () => {
  it('should generate a message', () => {
    const spyId = jest.spyOn(uuid, 'v4').mockImplementation(() => 'id');
    const message = messageGenerator('ok', PicktusMessageLevel.SUCCESS);
    expect(spyId).toHaveBeenCalled();
    expect(message).toEqual({
      id: 'id',
      text: 'ok',
      level: PicktusMessageLevel.SUCCESS,
    });
  });
});
