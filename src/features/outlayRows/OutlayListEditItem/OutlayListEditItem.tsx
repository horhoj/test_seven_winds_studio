import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { RowTreeNodeView } from '../types';
import styles from './OutlayListEditItem.module.scss';
import { getUUID } from '~/utils/getUUID';
import { Portal } from '~/ui/Portal';
import { getFormikFieldData } from '~/utils/getFormikFieldData';

interface OutlayListEditItemProps {
  row: RowTreeNodeView;
  onSubmit: (row: RowTreeNodeView) => void;
}

type InitialValues = Pick<
  RowTreeNodeView['body'],
  'rowName' | 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit'
>;

const VALIDATION_IS_EMPTY_MSG = 'не заполнено';
const VALIDATION_IS_NOT_STRING = 'не строка';
const VALIDATION_IS_NOT_NUMBER = 'не число';
const VALIDATION_IS_NOT_INTEGER = 'не целое число';
const VALIDATION_VERY_BIG_NUMBER = 'слишком большое число';
const VALIDATION_MAX_NUMBER = 999999999999999;

const validationSchema: yup.ObjectSchema<InitialValues> = yup.object({
  rowName: yup.string().typeError(VALIDATION_IS_NOT_STRING).required(VALIDATION_IS_EMPTY_MSG),
  salary: yup
    .number()
    .typeError(VALIDATION_IS_NOT_NUMBER)
    .max(VALIDATION_MAX_NUMBER, VALIDATION_VERY_BIG_NUMBER)
    .test('isInteger', VALIDATION_IS_NOT_INTEGER, (value) => Number.isInteger(value))
    .required(VALIDATION_IS_EMPTY_MSG),
  equipmentCosts: yup
    .number()
    .typeError(VALIDATION_IS_NOT_NUMBER)
    .test('isInteger', VALIDATION_IS_NOT_INTEGER, (value) => Number.isInteger(value))
    .required(VALIDATION_IS_EMPTY_MSG),
  overheads: yup
    .number()
    .typeError(VALIDATION_IS_NOT_NUMBER)
    .test('isInteger', VALIDATION_IS_NOT_INTEGER, (value) => Number.isInteger(value))
    .required(VALIDATION_IS_EMPTY_MSG),
  estimatedProfit: yup
    .number()
    .typeError(VALIDATION_IS_NOT_NUMBER)
    .test('isInteger', VALIDATION_IS_NOT_INTEGER, (value) => Number.isInteger(value))
    .required(VALIDATION_IS_EMPTY_MSG),
});

export function OutlayListEditItem({ row, onSubmit }: OutlayListEditItemProps) {
  const FORM_ID = useMemo(() => `form_${getUUID()}`, []);

  const formik = useFormik<InitialValues>({
    initialValues: {
      rowName: row.body.rowName,
      salary: row.body.salary,
      equipmentCosts: row.body.equipmentCosts,
      estimatedProfit: row.body.equipmentCosts,
      overheads: row.body.overheads,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const result: RowTreeNodeView = { ...row, body: { ...row.body, ...values } };
      onSubmit(result);
    },
  });

  const rowNameFieldData = getFormikFieldData(formik, 'rowName');
  const salaryFieldData = getFormikFieldData(formik, 'salary');
  const equipmentCostsFieldData = getFormikFieldData(formik, 'equipmentCosts');
  const overheadsFieldData = getFormikFieldData(formik, 'overheads');
  const estimatedProfitFieldData = getFormikFieldData(formik, 'estimatedProfit');

  return (
    <>
      <Portal>
        <form noValidate autoComplete={'off'} id={FORM_ID} onSubmit={formik.handleSubmit} className={styles.form}>
          <button form={FORM_ID} type={'submit'}>
            submit
          </button>
        </form>
      </Portal>
      <td>
        <span className={styles.field}>
          <input
            type="text"
            {...rowNameFieldData.fieldProps}
            form={FORM_ID}
            className={styles.input}
            autoFocus={true}
          />

          {rowNameFieldData.isError && <span className={styles.error}>{rowNameFieldData.errorText}</span>}
        </span>
      </td>

      <td>
        <span className={styles.field}>
          <input type="text" {...salaryFieldData.fieldProps} form={FORM_ID} className={styles.input} />
          {salaryFieldData.isError && <span className={styles.error}>{salaryFieldData.errorText}</span>}
        </span>
      </td>

      <td>
        <span className={styles.field}>
          <input type="text" {...equipmentCostsFieldData.fieldProps} form={FORM_ID} className={styles.input} />
          {equipmentCostsFieldData.isError && <span className={styles.error}>{equipmentCostsFieldData.errorText}</span>}
        </span>
      </td>

      <td>
        <span className={styles.field}>
          <input type="text" {...overheadsFieldData.fieldProps} form={FORM_ID} className={styles.input} />
          {overheadsFieldData.isError && <span className={styles.error}>{overheadsFieldData.errorText}</span>}
        </span>
      </td>

      <td>
        <span className={styles.field}>
          <input type="text" {...estimatedProfitFieldData.fieldProps} form={FORM_ID} className={styles.input} />
          {estimatedProfitFieldData.isError && (
            <span className={styles.error}>{estimatedProfitFieldData.errorText}</span>
          )}
        </span>
      </td>
    </>
  );
}
