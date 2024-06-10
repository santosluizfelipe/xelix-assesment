import React from "react";
import {
  TableInvoice,
  TableHeader,
  TableBody,
  TableContainer,
} from "./Table.style";

const InvoiceTable = ({ unpaidInvoices, filterInvoices, convertDate }) => {
  const filteredInvoices = filterInvoices(unpaidInvoices);

  const sortedInvoices = filteredInvoices.sort((a, b) => {
    return a.supplier.localeCompare(b.supplier);
  });

  const totalAmount = sortedInvoices.reduce(
    (total, invoice) => total + invoice.amount,
    0
  );

  return (
    <TableContainer>
      <TableInvoice>
        <TableHeader>
          <tr>
            <th>Supplier's Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Posted Date</th>
            <th>Due Date</th>
            <th>Invoice Number</th>
          </tr>
        </TableHeader>
        <TableBody>
          {sortedInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.supplier}</td>
              <td>{"£" + invoice.amount.toLocaleString()}</td>
              <td>{invoice.status}</td>
              <td>{convertDate(invoice.posted_date)}</td>
              <td>{convertDate(invoice.due_date)}</td>
              <td>{invoice.invoice_number}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong>{"£" + totalAmount.toLocaleString()}</strong>
            </td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </TableBody>
      </TableInvoice>
    </TableContainer>
  );
};

export default InvoiceTable;
