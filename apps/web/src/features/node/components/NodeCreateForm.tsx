import { Button, Form, Input, Select, Switch } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getNodeMessages } from "../i18n";
import type { CreateNodeInput } from "../types";

type NodeCreateFormProps = {
  isSubmitting: boolean;
  onSubmit: (values: CreateNodeInput) => void;
};

const { TextArea } = Input;

export function NodeCreateForm({
  isSubmitting,
  onSubmit,
}: NodeCreateFormProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getNodeMessages(locale);

  return (
    <Form<CreateNodeInput>
      layout="vertical"
      initialValues={{
        nodeType: "note",
        status: "todo",
        isMainline: true,
      }}
      onFinish={onSubmit}
    >
      <Form.Item
        label={messages.form.titleLabel}
        name="title"
        rules={[
          { required: true, message: messages.form.titleRequired },
          { max: 120, message: messages.form.titleMax },
        ]}
      >
        <Input placeholder={messages.form.titlePlaceholder} />
      </Form.Item>
      <Form.Item label={messages.form.contentLabel} name="content">
        <TextArea
          placeholder={messages.form.contentPlaceholder}
          autoSize={{ minRows: 3, maxRows: 6 }}
          maxLength={5000}
        />
      </Form.Item>
      <Form.Item label={messages.form.typeLabel} name="nodeType">
        <Select
          options={[
            { value: "note", label: messages.typeOptions.note },
            { value: "task", label: messages.typeOptions.task },
            { value: "decision", label: messages.typeOptions.decision },
          ]}
        />
      </Form.Item>
      <Form.Item label={messages.form.statusLabel} name="status">
        <Select
          options={[
            { value: "todo", label: messages.statusOptions.todo },
            { value: "doing", label: messages.statusOptions.doing },
            { value: "done", label: messages.statusOptions.done },
          ]}
        />
      </Form.Item>
      <Form.Item
        label={messages.form.branchModeLabel}
        name="isMainline"
        valuePropName="checked"
        extra={messages.form.branchModeHelp}
      >
        <Switch
          checkedChildren={messages.form.mainlineOn}
          unCheckedChildren={messages.form.mainlineOff}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isSubmitting}>
        {messages.form.submitCreate}
      </Button>
    </Form>
  );
}
