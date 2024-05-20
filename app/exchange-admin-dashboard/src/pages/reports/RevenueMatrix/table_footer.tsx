import { Tooltip, TableRow, TableCell } from '@mui/material';
import { North, South } from '@mui/icons-material';

export default function TableFooterComponent(tableProps:any) {

  return <>
    {/* Main Data Summary */}
    { tableProps?.tableProps?.tableData.length > 0 ?  <TableRow className={`super-app-theme--${tableProps?.tableProps?.dataSummary[0]?.row_class?.replaceAll(' ', '').replaceAll(':', '')}`}>
      <TableCell className='text-center text-weight-600'>{ tableProps?.tableProps?.dataSummary[0]?.row_no || "-" }</TableCell>
      <TableCell className='text-center text-weight-600'>Total</TableCell>
      <TableCell className='text-center text-weight-600'>{ tableProps?.tableProps?.dataSummary[0]?.total_gross_revenue || "-" }</TableCell>
      <TableCell className='text-center text-weight-600'>{ tableProps?.tableProps?.dataSummary[0]?.total_returns_received || "-" }</TableCell>
      <TableCell className='text-center text-weight-600'>{ tableProps?.tableProps?.dataSummary[0]?.net_revenue_after_returns || "-" }</TableCell>
      <TableCell className='text-center text-weight-600'>{ tableProps?.tableProps?.dataSummary[0]?.total_commission || "-" }</TableCell>
      <TableCell className='text-center text-weight-600'>{ tableProps?.tableProps?.dataSummary[0]?.total_net_profit || "-" }</TableCell>
      <TableCell className='text-center text-weight-600'>{ tableProps?.tableProps?.dataSummary[0]?.total_percentage || "-" }</TableCell>
    </TableRow> : "" }

    {/* Best Day Data */}
    { tableProps?.tableProps?.tableData.length > 0 && tableProps?.tableProps?.displayComparison ?<TableRow className={`super-app-theme--${tableProps?.tableProps?.bestDayData[0]?.row_class?.replaceAll(' ', '').replaceAll(':', '')}`}>
      <TableCell className='text-center'>{ tableProps?.tableProps?.bestDayData[0]?.row_no || "-" }</TableCell>
      <TableCell className='text-center'>{ tableProps?.tableProps?.bestDayData[0]?.date || "-" }</TableCell>
      <TableCell className='text-center'>
        { tableProps?.tableProps?.bestDayData[0]?.total_gross_revenue || "-" }
        { tableProps?.tableProps?.bestDayData[0]["total_gross_revenue_show_up_arrow"] ?
          (<div>
            {
              tableProps?.tableProps?.bestDayData[0]?.total_gross_revenue_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.bestDayData[0].total_gross_revenue_diff}
                      <North className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
         :
          (<div>
            {
              tableProps?.tableProps?.bestDayData[0]?.total_gross_revenue_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.bestDayData[0].total_gross_revenue_diff}
                      <South className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
        }
      </TableCell>
      <TableCell className='text-center'>
        { tableProps?.tableProps?.bestDayData[0]?.total_returns_received || "-" }
        { tableProps?.tableProps?.bestDayData[0]["total_returns_received_show_up_arrow"] ?
          (<div>
            {
              tableProps?.tableProps?.bestDayData[0]?.total_returns_received_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.bestDayData[0].total_returns_received_diff}
                      <North className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
         :
          (<div>
            {
              tableProps?.tableProps?.bestDayData[0]?.total_returns_received_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.bestDayData[0].total_returns_received_diff}
                      <South className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
        }
      </TableCell>
      <TableCell className='text-center'>
        { tableProps?.tableProps?.bestDayData[0]?.net_revenue_after_returns || "-" }
        { tableProps?.tableProps?.bestDayData[0]["net_revenue_after_returns_show_up_arrow"] ?
          (<div>
            {
              tableProps?.tableProps?.bestDayData[0]?.net_revenue_after_returns_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.bestDayData[0].net_revenue_after_returns_diff}
                      <North className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
         :
          (<div>
            {
              tableProps?.tableProps?.bestDayData[0]?.net_revenue_after_returns_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.bestDayData[0].net_revenue_after_returns_diff}
                      <South className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
        }
      </TableCell>
      <TableCell className='text-center'>
        { tableProps?.tableProps?.bestDayData[0]?.total_commission || "-" }
        { tableProps?.tableProps?.bestDayData[0]["total_commission_show_up_arrow"] ?
          (<div>
            {
              tableProps?.tableProps?.bestDayData[0]?.total_commission_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.bestDayData[0].total_commission_diff}
                      <North className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
         :
          (<div>
            {
              tableProps?.tableProps?.bestDayData[0]?.total_commission_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.bestDayData[0].total_commission_diff}
                      <South className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
        }
      </TableCell>
      <TableCell className='text-center'>
        { tableProps?.tableProps?.bestDayData[0]?.total_net_profit || "-" }
        { tableProps?.tableProps?.bestDayData[0]["total_net_profit_show_up_arrow"] ?
          (<div>
            {
              tableProps?.tableProps?.bestDayData[0]?.total_net_profit_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.bestDayData[0].total_net_profit_diff}
                      <North className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
         :
          (<div>
            {
              tableProps?.tableProps?.bestDayData[0]?.total_net_profit_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.bestDayData[0].total_net_profit_diff}
                      <South className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
        }
      </TableCell>
      <TableCell className='text-center'>{ tableProps?.tableProps?.bestDayData[0]?.total_percentage || "-" }</TableCell>
    </TableRow> : "" }

    {/* Last Same Day Data */}
    { tableProps?.tableProps?.tableData.length > 0 && tableProps?.tableProps?.displayComparison ?<TableRow className={`super-app-theme--${tableProps?.tableProps?.lastSameDayData[0]?.row_class?.replaceAll(' ', '').replaceAll(':', '')}`}>
      <TableCell className='text-center'>{ tableProps?.tableProps?.lastSameDayData[0]?.row_no || "-" }</TableCell>
      <TableCell className='text-center'>{ tableProps?.tableProps?.lastSameDayData[0]?.date || "-" }</TableCell>
      <TableCell className='text-center'>
        { tableProps?.tableProps?.lastSameDayData[0]?.total_gross_revenue || "-" }
        { tableProps?.tableProps?.lastSameDayData[0]["total_gross_revenue_show_up_arrow"] ?
          (<div>
            {
              tableProps?.tableProps?.lastSameDayData[0]?.total_gross_revenue_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.lastSameDayData[0].total_gross_revenue_diff}
                      <North className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
         :
          (<div>
            {
              tableProps?.tableProps?.lastSameDayData[0]?.total_gross_revenue_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.lastSameDayData[0].total_gross_revenue_diff}
                      <South className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
        }
      </TableCell>
      <TableCell className='text-center'>
        { tableProps?.tableProps?.lastSameDayData[0]?.total_returns_received || "-" }
        { tableProps?.tableProps?.lastSameDayData[0]["total_returns_received_show_up_arrow"] ?
          (<div>
            {
              tableProps?.tableProps?.lastSameDayData[0]?.total_returns_received_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.lastSameDayData[0].total_returns_received_diff}
                      <North className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
         :
          (<div>
            {
              tableProps?.tableProps?.lastSameDayData[0]?.total_returns_received_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.lastSameDayData[0].total_returns_received_diff}
                      <South className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
        }
      </TableCell>
      <TableCell className='text-center'>
        { tableProps?.tableProps?.lastSameDayData[0]?.net_revenue_after_returns || "-" }
        { tableProps?.tableProps?.lastSameDayData[0]["net_revenue_after_returns_show_up_arrow"] ?
          (<div>
            {
              tableProps?.tableProps?.lastSameDayData[0]?.net_revenue_after_returns_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.lastSameDayData[0].net_revenue_after_returns_diff}
                      <North className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
         :
          (<div>
            {
              tableProps?.tableProps?.lastSameDayData[0]?.net_revenue_after_returns_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.lastSameDayData[0].net_revenue_after_returns_diff}
                      <South className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
        }
      </TableCell>
      <TableCell className='text-center'>
        { tableProps?.tableProps?.lastSameDayData[0]?.total_commission || "-" }
        { tableProps?.tableProps?.lastSameDayData[0]["total_commission_show_up_arrow"] ?
          (<div>
            {
              tableProps?.tableProps?.lastSameDayData[0]?.total_commission_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.lastSameDayData[0].total_commission_diff}
                      <North className='rowicon'/>

                    </>
                  )
                : ""
            }
          </div>)
         :
          (<div>
            {
              tableProps?.tableProps?.lastSameDayData[0]?.total_commission_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.lastSameDayData[0].total_commission_diff}
                      <South className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
        }
      </TableCell>
      <TableCell className='text-center'>
        { tableProps?.tableProps?.lastSameDayData[0]?.total_net_profit || "-" }
        { tableProps?.tableProps?.lastSameDayData[0]["total_net_profit_show_up_arrow"] ?
          (<div>
            {
              tableProps?.tableProps?.lastSameDayData[0]?.total_net_profit_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.lastSameDayData[0].total_net_profit_diff}
                      <North className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
         :
          (<div>
            {
              tableProps?.tableProps?.lastSameDayData[0]?.total_net_profit_diff !== undefined
                ? (
                    <>
                      {tableProps.tableProps.lastSameDayData[0].total_net_profit_diff}
                      <South className='rowicon'/>
                    </>
                  )
                : ""
            }
          </div>)
        }
      </TableCell>
      <TableCell className='text-center'>{ tableProps?.tableProps?.lastSameDayData[0]?.total_percentage || "-" }</TableCell>
    </TableRow> : "" }

    {/* Footer Section */}
    <TableRow>
      <TableCell className='text-center text-weight-600 ptb16lr5' component="th">Row	</TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5' component="th">Date</TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5 gross' component="th">Gross <div>Revenue</div></TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5 rcvd' component="th">Total Ret's <div>Rcvd</div></TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5 return' component="th">Net Rev <div>(after returns)</div></TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5 commission' component="th">Total <div>Commission</div></TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5 profit' component="th">Net <div>Profit</div></TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5 percentage' component="th">%</TableCell>
    </TableRow>

    <TableRow>
      <TableCell colSpan={8} className='text-center text-weight-600 ptb16lr5' component="th">
        <Tooltip title={tableProps?.tableProps?.tableTooltip || ""}><span>{tableProps?.tableProps?.tableTitle || ""}</span></Tooltip>
      </TableCell>
    </TableRow>
  </>;
}
