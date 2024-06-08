
export const convertDate = (dateStr) => {
  let parts = dateStr.split("-");
  let dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  let formattedDay = day < 10 ? "0" + day : day;
  let formattedMonth = month < 10 ? "0" + month : month;

  let formattedDate = formattedDay + "/" + formattedMonth + "/" + year;

  return formattedDate;
};


export const filterInvoices = (invoices, filters, excludedSuppliers) => {
  return invoices.filter((invoice) => {
    const { maxAmount, dueDate, supplier, postedDate, invoiceNumbers } = filters;

    const maxAmountFilter = maxAmount
      ? invoice.amount <= parseFloat(maxAmount)
      : true;
    const dueDateFilter = dueDate
      ? new Date(invoice.due_date) <= new Date(dueDate)
      : true;
    const supplierFilter = supplier
      ? invoice.supplier.toLowerCase().includes(supplier.toLowerCase())
      : true;
    const postedDateFilter = postedDate
      ? new Date(invoice.posted_date) <= new Date(postedDate)
      : true;
    const invoiceNumberFilter = invoiceNumbers.length > 0
      ? invoiceNumbers.some((opt) => opt.value === invoice.invoice_number)
      : true;
    const excludeSupplierFilter = excludedSuppliers.length > 0
      ? !excludedSuppliers.includes(invoice.supplier)
      : true;

    return (
      maxAmountFilter &&
      dueDateFilter &&
      supplierFilter &&
      postedDateFilter &&
      invoiceNumberFilter &&
      excludeSupplierFilter
    );
  });
};