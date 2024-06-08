
import React from "react";
import {
  TableInvoice,
  TableHeader,
  TableBody,
  TableContainer,
} from "./Table.style";

const InvoiceTable = ({ unpaidInvoices, filterInvoices, convertDate }) => {
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
          {filterInvoices(unpaidInvoices).map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.supplier}</td>
              <td>{"£" + invoice.amount.toLocaleString()}</td>
              <td>{invoice.status}</td>
              <td>{convertDate(invoice.posted_date)}</td>
              <td>{convertDate(invoice.due_date)}</td>
              <td>{invoice.invoice_number}</td>
            </tr>
          ))}
        </TableBody>
      </TableInvoice>
    </TableContainer>
  );
};

export default InvoiceTable;
