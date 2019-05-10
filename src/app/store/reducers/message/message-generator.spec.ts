import uuid from 'uuid';
import messageGenerator from './message-generator';
import { PicktusMessageLevel } from './message.type';

describe('message-generator', () => {
  it('should generate a message', () => {
    // @ts-ignore-start
    const spyId = jest.spyOn(uuid, 'v4').mockReturnValue('id');
    // @ts-ignore-end
    const message = messageGenerator('ok', PicktusMessageLevel.SUCCESS);
    expect(spyId).toHaveBeenCalled();
    expect(message).toEqual({
      id: 'id',
      level: PicktusMessageLevel.SUCCESS,
      text: 'ok',
    });
  });
});
