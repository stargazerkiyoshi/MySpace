import { useEffect, useMemo, useState } from "react";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
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
import {
  formatNodeDate,
  getNodeStatusLabel,
  getNodeTypeLabel,
} from "../utils";

type NodeDetailFormProps = {
  node: NodeRecord | null;
  isSubmitting: boolean;
  onSubmit: (values: UpdateNodeInput) => void;
};

type EditableField = "title" | "content" | "nodeType" | "status" | "isMainline";

const { TextArea } = Input;

export function NodeDetailForm({
  node,
  isSubmitting,
  onSubmit,
}: NodeDetailFormProps) {
  const [form] = Form.useForm<UpdateNodeInput>();
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getNodeMessages(locale);
  const [editableFields, setEditableFields] = useState<Set<EditableField>>(
    () => new Set(),
  );
  const watchedValues = Form.useWatch([], form);

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
    setEditableFields(new Set());
  }, [form, node]);

  const currentValues = useMemo(
    () => ({
      title: watchedValues?.title ?? node?.title ?? "",
      content: watchedValues?.content ?? node?.content ?? "",
      nodeType: watchedValues?.nodeType ?? node?.nodeType ?? "note",
      status: watchedValues?.status ?? node?.status ?? "todo",
      isMainline: watchedValues?.isMainline ?? true,
    }),
    [node, watchedValues],
  );

  if (!node) {
    return <Empty description={messages.workspace.emptyDetail} />;
  }

  function enableEdit(field: EditableField) {
    setEditableFields((current) => new Set(current).add(field));
  }

  function disableEdit(field: EditableField) {
    setEditableFields((current) => {
      const next = new Set(current);
      next.delete(field);
      return next;
    });
  }

  function renderValue(
    field: EditableField,
    display: React.ReactNode,
    editor: React.ReactNode,
  ) {
    const isEditing = editableFields.has(field);

    if (isEditing) {
      return (
        <div className="node-detail-form__value node-detail-form__value--editing">
          <div className="node-detail-form__editor">{editor}</div>
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            aria-label="Cancel editing"
            onClick={() => disableEdit(field)}
          />
        </div>
      );
    }

    return (
      <div className="node-detail-form__value">
        <div className="node-detail-form__display">{display}</div>
        <Button
          className="node-detail-form__edit-button"
          type="text"
          size="small"
          icon={<EditOutlined />}
          aria-label="Edit field"
          onClick={() => enableEdit(field)}
        />
      </div>
    );
  }

  return (
    <Form<UpdateNodeInput>
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      className="node-detail-form"
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Descriptions
          title={messages.detail.metaTitle}
          column={1}
          items={[
            {
              key: "title",
              label: messages.form.titleLabel,
              children: renderValue(
                "title",
                <Typography.Text strong>{currentValues.title}</Typography.Text>,
                <Form.Item
                  name="title"
                  rules={[
                    { required: true, message: messages.form.titleRequired },
                    { max: 120, message: messages.form.titleMax },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <Input placeholder={messages.form.titlePlaceholder} />
                </Form.Item>,
              ),
            },
            {
              key: "content",
              label: messages.form.contentLabel,
              children: renderValue(
                "content",
                <Typography.Paragraph style={{ marginBottom: 0 }}>
                  {currentValues.content || messages.detail.noContent}
                </Typography.Paragraph>,
                <Form.Item name="content" style={{ marginBottom: 0 }}>
                  <TextArea
                    placeholder={messages.form.contentPlaceholder}
                    autoSize={{ minRows: 5, maxRows: 10 }}
                    maxLength={5000}
                  />
                </Form.Item>,
              ),
            },
            {
              key: "nodeType",
              label: messages.form.typeLabel,
              children: renderValue(
                "nodeType",
                <Typography.Text>
                  {getNodeTypeLabel(locale, currentValues.nodeType)}
                </Typography.Text>,
                <Form.Item name="nodeType" style={{ marginBottom: 0 }}>
                  <Select
                    options={[
                      { value: "note", label: messages.typeOptions.note },
                      { value: "task", label: messages.typeOptions.task },
                      { value: "decision", label: messages.typeOptions.decision },
                    ]}
                  />
                </Form.Item>,
              ),
            },
            {
              key: "status",
              label: messages.form.statusLabel,
              children: renderValue(
                "status",
                <Typography.Text>
                  {getNodeStatusLabel(locale, currentValues.status)}
                </Typography.Text>,
                <Form.Item name="status" style={{ marginBottom: 0 }}>
                  <Select
                    options={[
                      { value: "todo", label: messages.statusOptions.todo },
                      { value: "doing", label: messages.statusOptions.doing },
                      { value: "done", label: messages.statusOptions.done },
                    ]}
                  />
                </Form.Item>,
              ),
            },
            {
              key: "isMainline",
              label: messages.form.branchModeLabel,
              children: renderValue(
                "isMainline",
                <Typography.Text>
                  {currentValues.isMainline
                    ? messages.form.mainlineOn
                    : messages.form.mainlineOff}
                </Typography.Text>,
                <Form.Item
                  name="isMainline"
                  valuePropName="checked"
                  extra={messages.form.branchModeHelp}
                  style={{ marginBottom: 0 }}
                >
                  <Switch
                    checkedChildren={messages.form.mainlineOn}
                    unCheckedChildren={messages.form.mainlineOff}
                  />
                </Form.Item>,
              ),
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

        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {messages.form.submitUpdate}
        </Button>
      </Space>
    </Form>
  );
}
