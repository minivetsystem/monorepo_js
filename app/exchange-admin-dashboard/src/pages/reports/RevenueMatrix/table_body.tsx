import { Tooltip, TableBody, TableRow, TableCell } from '@mui/material';
import { North, South } from '@mui/icons-material';
export default function TableBodyComponent(tableProps:any) {
  const tableData          = tableProps?.revenueMatrixReport.lead_type_data[tableProps?.lead_type]?.normal_day_data || [];
  const dataSummary        = [tableProps?.revenueMatrixReport.lead_type_data[tableProps?.lead_type]?.lead_data_summary] || [];
  const bestDayData        = [tableProps?.revenueMatrixReport.lead_type_data[tableProps?.lead_type]?.best_day_data] || [];
  const lastSameDayData    = [tableProps?.revenueMatrixReport.lead_type_data[tableProps?.lead_type]?.last_same_day_data] || [];

  return (
    <TableBody>
      <TableRow>
        <TableCell className='table-divider'></TableCell>
        <TableCell className='text-center text-weight-600 ptb16lr5' colSpan={6} component="th">
          <Tooltip title={tableProps?.lead_label}><span>{tableProps?.lead_label}</span></Tooltip>
        </TableCell>
      </TableRow>

      <TableRow>
          <TableCell className='table-divider'></TableCell>
          <TableCell className='text-center text-weight-600 gross ptb16lr5' component="th">Gross <div>Revenue</div></TableCell>
          <TableCell className='text-center text-weight-600 rcvd ptb16lr5' component="th"><div>Total Ret's</div> <div>Rcvd</div>	</TableCell>
          <TableCell className='text-center text-weight-600 return ptb16lr5' component="th">Total <div>Commission</div></TableCell>
          <TableCell className='text-center text-weight-600 commission ptb16lr5' component="th"><div>Net Rev</div> <div>(after returns)</div></TableCell>
          <TableCell className='text-center text-weight-600 profit ptb16lr5' component="th">Net <div>Profit</div></TableCell>
          <TableCell className='text-center text-weight-600 percentage ptb16lr5' component="th">%</TableCell>
      </TableRow>

      { tableData.length > 0 ? tableData.map((item, key) => {
        return (
          <TableRow key={key} className={`super-app-theme--${item?.row_class?.replaceAll(' ', '').replaceAll(':', '')}`}>
            <TableCell className='table-divider'></TableCell>
            <TableCell className='text-center'>{item.total_gross_revenue}</TableCell>
            <TableCell className='text-center'>{item.total_returns_received}</TableCell>
            <TableCell className='text-center'>{item.net_revenue_after_returns}</TableCell>
            <TableCell className='text-center'>{item.total_commission}</TableCell>
            <TableCell className='text-center'>{item.total_net_profit}</TableCell>
            <TableCell className='text-center'>{item.total_percentage}</TableCell>
          </TableRow>
        )
      }) : <TableRow>
            <TableCell className='table-divider'></TableCell>
            <TableCell sx={{ lineHeight: "15rem", textAlign: "center" }} colSpan={6}>No rows</TableCell>
          </TableRow>
        }

      {/* Main Data Summary */}
      { tableData.length > 0 ? <TableRow className={`super-app-theme--${dataSummary[0]?.row_class?.replaceAll(' ', '').replaceAll(':', '')}`}>
        <TableCell className='table-divider'></TableCell>
        <TableCell className='text-center gross text-weight-600'>{ dataSummary[0]?.total_gross_revenue || "-" }</TableCell>
        <TableCell className='text-center rcvd text-weight-600'>{ dataSummary[0]?.total_returns_received || "-" }</TableCell>
        <TableCell className='text-center return text-weight-600'>{ dataSummary[0]?.net_revenue_after_returns || "-" }</TableCell>
        <TableCell className='text-center commission text-weight-600'>{ dataSummary[0]?.total_commission || "-" }</TableCell>
        <TableCell className='text-center profit text-weight-600'>{ dataSummary[0]?.total_net_profit || "-" }</TableCell>
        <TableCell className='text-center percentage text-weight-600'>{ dataSummary[0]?.total_percentage || "-" }</TableCell>
      </TableRow>  : "" }

      {/* Best Day Data */}
      { tableData.length > 0 && tableProps?.displayComparison ? <TableRow className={`super-app-theme--${bestDayData[0]?.row_class?.replaceAll(' ', '').replaceAll(':', '')}`}>
        <TableCell className='table-divider'></TableCell>
        <TableCell className='text-center gross'>
          {bestDayData[0]?.total_gross_revenue || "-"}
          {bestDayData[0]["total_gross_revenue_show_up_arrow"] ? (
            <div>
              {bestDayData[0]["total_gross_revenue_diff"] ? (
                <span>
                  {bestDayData[0]["total_gross_revenue_diff"]}
                  <North className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              {bestDayData[0]["total_gross_revenue_diff"] ? (
                <span>
                  {bestDayData[0]["total_gross_revenue_diff"]}
                  <South className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </TableCell>
        <TableCell className='text-center rcvd'>
          { bestDayData[0]?.total_returns_received || "-" }

          {bestDayData[0]["total_returns_received_show_up_arrow"] ? (
            <div>
              {bestDayData[0]["total_returns_received_diff"] ? (
                <span>
                  {bestDayData[0]["total_returns_received_diff"]}
                  <North className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              {bestDayData[0]["total_returns_received_diff"] ? (
                <span>
                  {bestDayData[0]["total_returns_received_diff"]}
                  <South className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </TableCell>
        <TableCell className='text-center return'>
          { bestDayData[0]?.net_revenue_after_returns || "-" }
          {bestDayData[0]["net_revenue_after_returns_show_up_arrow"] ? (
            <div>
              {bestDayData[0]["net_revenue_after_returns_diff"] ? (
                <span>
                  {bestDayData[0]["net_revenue_after_returns_diff"]}
                  <North className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              {bestDayData[0]["net_revenue_after_returns_diff"] ? (
                <span>
                  {bestDayData[0]["net_revenue_after_returns_diff"]}
                  <South className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </TableCell>
        <TableCell className='text-center commission'>
          { bestDayData[0]?.total_commission || "-" }
          {bestDayData[0]["total_commission_show_up_arrow"] ? (
            <div>
              {bestDayData[0]["total_commission_diff"] ? (
                <span>
                  {bestDayData[0]["total_commission_diff"]}
                  <North className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              {bestDayData[0]["total_commission_diff"] ? (
                <span>
                  {bestDayData[0]["total_commission_diff"]}
                  <South className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </TableCell>
        <TableCell className='text-center profit'>
          { bestDayData[0]?.total_net_profit || "-" }

          {bestDayData[0]["total_net_profit_show_up_arrow"] ? (
            <div>
              {bestDayData[0]["total_net_profit_diff"] ? (
                <span>
                  {bestDayData[0]["total_net_profit_diff"]}
                  <North className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              {bestDayData[0]["total_net_profit_diff"] ? (
                <span>
                  {bestDayData[0]["total_net_profit_diff"]}
                  <South className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </TableCell>
        <TableCell className='text-center percentage'>{ bestDayData[0]?.total_percentage || "-" }</TableCell>
      </TableRow> : "" }

      {/* Last Same Day Data */}
      { tableData.length > 0 && tableProps?.displayComparison ? <TableRow className={`super-app-theme--${lastSameDayData[0]?.row_class?.replaceAll(' ', '').replaceAll(':', '')}`}>
        <TableCell className='table-divider'></TableCell>
        <TableCell className='text-center gross'>
          {lastSameDayData[0]?.total_gross_revenue || "-"}
          {lastSameDayData[0]["total_gross_revenue_show_up_arrow"] ? (
            <div>
              {lastSameDayData[0]["total_gross_revenue_diff"] ? (
                <span>
                  {lastSameDayData[0]["total_gross_revenue_diff"]}
                  <North className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              {lastSameDayData[0]["total_gross_revenue_diff"] ? (
                <span>
                  {lastSameDayData[0]["total_gross_revenue_diff"]}
                  <South className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </TableCell>
        <TableCell className='text-center rcvd'>
          { lastSameDayData[0]?.total_returns_received || "-" }

          {lastSameDayData[0]["total_returns_received_show_up_arrow"] ? (
            <div>
              {lastSameDayData[0]["total_returns_received_diff"] ? (
                <span>
                  {lastSameDayData[0]["total_returns_received_diff"]}
                  <North className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              {lastSameDayData[0]["total_returns_received_diff"] ? (
                <span>
                  {lastSameDayData[0]["total_returns_received_diff"]}
                  <South className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </TableCell>
        <TableCell className='text-center return'>
          { lastSameDayData[0]?.net_revenue_after_returns || "-" }
          {lastSameDayData[0]["net_revenue_after_returns_show_up_arrow"] ? (
            <div>
              {lastSameDayData[0]["net_revenue_after_returns_diff"] ? (
                <span>
                  {lastSameDayData[0]["net_revenue_after_returns_diff"]}
                  <North className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              {lastSameDayData[0]["net_revenue_after_returns_diff"] ? (
                <span>
                  {lastSameDayData[0]["net_revenue_after_returns_diff"]}
                  <South className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </TableCell>
        <TableCell className='text-center commission'>
          { lastSameDayData[0]?.total_commission || "-" }
          {lastSameDayData[0]["total_commission_show_up_arrow"] ? (
            <div>
              {lastSameDayData[0]["total_commission_diff"] ? (
                <span>
                  {lastSameDayData[0]["total_commission_diff"]}
                  <North className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              {lastSameDayData[0]["total_commission_diff"] ? (
                <span>
                  {lastSameDayData[0]["total_commission_diff"]}
                  <South className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </TableCell>
        <TableCell className='text-center profit'>
          { lastSameDayData[0]?.total_net_profit || "-" }

          {lastSameDayData[0]["total_net_profit_show_up_arrow"] ? (
            <div>
              {lastSameDayData[0]["total_net_profit_diff"] ? (
                <span>
                  {lastSameDayData[0]["total_net_profit_diff"]}
                  <North className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              {lastSameDayData[0]["total_net_profit_diff"] ? (
                <span>
                  {lastSameDayData[0]["total_net_profit_diff"]}
                  <South className='rowicon'/>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </TableCell>
        <TableCell className='text-center percentage'>{ lastSameDayData[0]?.total_percentage || "-" }</TableCell>
      </TableRow> : "" }

      {/* Footer Section */}
      <TableRow>
        <TableCell className='table-divider'></TableCell>
        <TableCell className='text-center text-weight-600 cell-area ptb16lr5' component="th">Gross <div>Revenue</div></TableCell>
        <TableCell className='text-center text-weight-600 cell-area ptb16lr5' component="th"><div>Total Ret's</div> <div>Rcvd</div>	</TableCell>
        <TableCell className='text-center text-weight-600 cell-area ptb16lr5' component="th">Total <div>Commission</div></TableCell>
        <TableCell className='text-center text-weight-600 cell-area ptb16lr5' component="th"><div>Net Rev</div> <div>(after returns)</div></TableCell>
        <TableCell className='text-center text-weight-600 cell-area ptb16lr5' component="th">Net <div>Profit</div></TableCell>
        <TableCell className='text-center text-weight-600 cell-area ptb16lr5' component="th">%</TableCell>
      </TableRow>

      <TableRow>
        <TableCell className='table-divider'></TableCell>
        <TableCell className='text-center text-weight-600 ptb16lr5' colSpan={6} component="th">
          <Tooltip title={tableProps?.lead_label}><span>{tableProps?.lead_label}</span></Tooltip>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
