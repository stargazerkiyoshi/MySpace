import { useEffect } from "react";
import {
  Button,
  Descriptions,
  Empty,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getNodeMessages } from "../i18n";
import type { NodeRecord, UpdateNodeInput } from "../types";
import { formatNodeDate, getNodeStatusLabel, getNodeTypeLabel } from "../utils";

type NodeDetailFormProps = {
  node: NodeRecord | null;
  isSubmitting: boolean;
  onSubmit: (values: UpdateNodeInput) => void;
};

const { TextArea } = Input;

export function NodeDetailForm({
  node,
  isSubmitting,
  onSubmit,
}: NodeDetailFormProps) {
  const [form] = Form.useForm<UpdateNodeInput>();
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getNodeMessages(locale);

  useEffect(() => {
    if (node) {
      form.setFieldsValue({
        title: node.title,
        content: node.content ?? "",
        nodeType: node.nodeType,
        status: node.status,
        isMainline: true,
      });
    } else {
      form.resetFields();
    }
  }, [form, node]);

  if (!node) {
    return <Empty description={messages.workspace.emptyDetail} />;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Descriptions
        title={messages.detail.metaTitle}
        column={1}
        items={[
          {
            key: "type",
            label: messages.list.typeLabel,
            children: getNodeTypeLabel(locale, node.nodeType),
          },
          {
            key: "status",
            label: messages.list.statusLabel,
            children: getNodeStatusLabel(locale, node.status),
          },
          {
            key: "createdAt",
            label: messages.detail.createdAt,
            children: formatNodeDate(node.createdAt),
          },
          {
            key: "updatedAt",
            label: messages.detail.updatedAt,
            children: formatNodeDate(node.updatedAt),
          },
        ]}
      />

      <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
        {node.content || messages.detail.noContent}
      </Typography.Paragraph>

      <Form<UpdateNodeInput> form={form} layout="vertical" onFinish={onSubmit}>
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
            autoSize={{ minRows: 6, maxRows: 12 }}
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
          {messages.form.submitUpdate}
        </Button>
      </Form>
    </Space>
  );
}
