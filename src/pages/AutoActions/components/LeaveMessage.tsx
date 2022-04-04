import React from "react";
import {Button, Checkbox, Group, Textarea, Text, Code, Anchor, Select} from "@mantine/core";
import useAutoActions from "../hooks/useAutoActions";
import produce from "immer";
import {useNotifications} from "@mantine/notifications";
import useServerChannel from "../../../hooks/useServerChannel";

interface LeaveMessagePayload {
  message: string,
  enabled: boolean,
  channel: string,
}

interface LeaveMessageProps {
  serverId: string,
  openDocs: () => void,
}

function LeaveMessage({serverId, openDocs}: LeaveMessageProps) {
  const { payload, loading: actionLoading, error, save, setPayload } = useAutoActions<LeaveMessagePayload>('leave-message', serverId);
  const { channel, channelLoading } = useServerChannel(serverId, 'text');
  const { showNotification } = useNotifications();

  const loading = actionLoading || channelLoading;

  return (
    <Group direction={'column'}>
      <Text>A message that is automatically send when a new member leaves the Server!</Text>
      <Text>
        Available template objects are: <Code>user</Code> & <Code>guild</Code>.
        Click <Anchor onClick={openDocs}>here</Anchor> for help about templates.
      </Text>
      <Textarea
        label="Message"
        autosize
        minRows={2}
        maxRows={6}
        disabled={loading}
        value={payload.message}
        style={{width: '100%'}}
        onChange={evt => {
          setPayload(produce(draft => {
            draft.message = evt.target.value;
          }))
        }}
      />
      <Select
        label={'Channel'}
        style={{width: '100%'}}
        data={channel.map((channel) => {
          return {
            label: `#${channel.name}`,
            value: channel.id,
          }
        })}
        value={payload.channel}
        onChange={value => {
          setPayload(produce(draft => {
            draft.channel = value;
          }))
        }}
      />
      <Checkbox
        label="Enabled"
        checked={payload.enabled || false}
        disabled={loading}
        style={{width: '100%'}}
        onChange={evt => {
          setPayload(produce(draft => {
            draft.enabled = evt.target.checked;
          }))
        }}
      />
      <Text color={'dimmed'}>
        Note that the action will also be disabled if the selected channel is deleted or the message is empty.
      </Text>
      <Button
        fullWidth
        disabled={loading}
        onClick={() => {
          save().then(() => {
            showNotification({
              message: 'Leave message was saved',
              title: 'Saved',
            })
          })
        }}
      >Save Leave Message</Button>
      <Text color={'red'}>{error}</Text>
    </Group>
  )
}

export default LeaveMessage;
