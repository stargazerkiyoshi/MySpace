import { Button, Form, Input } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getSpaceMessages } from "../i18n";
import type { CreateSpaceInput } from "../types";

type SpaceCreateFormProps = {
  isSubmitting: boolean;
  onSubmit: (values: CreateSpaceInput) => void;
  initialValues?: CreateSpaceInput;
  submitLabel?: string;
};

export function SpaceCreateForm({
  isSubmitting,
  onSubmit,
  initialValues,
  submitLabel,
}: SpaceCreateFormProps) {
  const { locale } = useUiLocaleStore();
  const messages = getSpaceMessages(locale).form;

  return (
    <Form<CreateSpaceInput>
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues ?? { name: "", description: "" }}
    >
      <Form.Item
        label={messages.nameLabel}
        name="name"
        rules={[
          { required: true, message: messages.nameRequired },
          { max: 80, message: messages.nameMax },
        ]}
      >
        <Input placeholder={messages.namePlaceholder} />
      </Form.Item>
      <Form.Item
        label={messages.descriptionLabel}
        name="description"
        rules={[{ max: 400, message: messages.descriptionMax }]}
      >
        <Input.TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          placeholder={messages.descriptionPlaceholder}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isSubmitting}>
        {submitLabel ?? messages.submit}
      </Button>
    </Form>
  );
}
