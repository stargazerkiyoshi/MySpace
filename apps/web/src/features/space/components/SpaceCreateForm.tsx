import { Button, Form, Input } from "antd";
import type { CreateSpaceInput } from "../types";

type SpaceCreateFormProps = {
  isSubmitting: boolean;
  onSubmit: (values: CreateSpaceInput) => void;
};

export function SpaceCreateForm({
  isSubmitting,
  onSubmit,
}: SpaceCreateFormProps) {
  return (
    <Form<CreateSpaceInput>
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{ name: "", description: "" }}
    >
      <Form.Item
        label="Space Name"
        name="name"
        rules={[
          { required: true, message: "请输入 Space 名称。" },
          { max: 80, message: "Space 名称不能超过 80 个字符。" },
        ]}
      >
        <Input placeholder="例如：产品发布协作空间" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ max: 400, message: "描述不能超过 400 个字符。" }]}
      >
        <Input.TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          placeholder="简要说明这个 Space 正在承载的目标或事项。"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isSubmitting}>
        Create Space
      </Button>
    </Form>
  );
}
