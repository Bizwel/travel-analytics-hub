import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export function exportToCsv(rows, filename = 'travel-report.csv') {
  if (!rows?.length) {
    return
  }

  const headers = Object.keys(rows[0])
  const csvRows = [headers.join(',')]

  rows.forEach((row) => {
    const values = headers.map((header) => {
      const value = row[header] ?? ''
      return `"${String(value).replace(/"/g, '""')}"`
    })
    csvRows.push(values.join(','))
  })

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
  downloadBlob(blob, filename)
}

export function exportToExcel(rows, filename = 'travel-report.xlsx') {
  if (!rows?.length) {
    return
  }

  const worksheet = []
  const headers = Object.keys(rows[0])
  worksheet.push(headers)

  rows.forEach((row) => {
    worksheet.push(headers.map((header) => row[header] ?? ''))
  })

  const workbook = {
    SheetNames: ['Report'],
    Sheets: {
      Report: {
        data: worksheet,
        '!ref': `A1:${String.fromCharCode(65 + headers.length - 1)}${worksheet.length}`,
      },
    },
  }

  const json = JSON.stringify(workbook)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
  downloadBlob(blob, filename)
}

export async function exportToPdf(element, filename = 'travel-report.pdf') {
  if (!element) {
    return
  }

  const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'pt', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth - 40
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  let heightLeft = imgHeight
  let position = 20

  pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  while (heightLeft > 0) {
    position = heightLeft - imgHeight + 20
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  pdf.save(filename)
}

export function printReport(element) {
  if (!element) {
    return
  }

  const printWindow = window.open('', '', 'width=900,height=700')
  if (!printWindow) {
    return
  }

  printWindow.document.write('<html><head><title>Travel Analytics Report</title></head><body>')
  printWindow.document.write(element.innerHTML)
  printWindow.document.write('</body></html>')
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
}
