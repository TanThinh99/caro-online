function AddWinPosition(winPositionList, x, y, count)
{
    var position = [];
    position[0] = x;
    position[1] = y;
    winPositionList[count] = position;
} 
    
    // CheckWin có chức năng kiểm tra có thắng không?
    // Có các tham số:
        // rows is matrix. (x, y) is position. amount_of_win là số con cờ để có thể thắng 
    // return danh sách các con cờ để thắng
        // Nếu danh sách có 1 phần tử có nghĩa là chưa có kết quả, ngược lại là thắng
function CheckWin(rows, x, y, amount_to_win)
{
    var x1, y1, tempPosition, count = 1;
    var amount_of_row = rows.length - 1;
    var amount_of_col = rows[1].length - 1;
    var initPosition = rows[x][y];
    
    winPositionList = [];
    position = [];
    position[0] = x;
    position[1] = y;
    winPositionList[0] = position;

    // =========== KIỂM TRA THEO CHIỀU ĐỨNG =======================================================
        // Kiểm tra đi lên
    x1 = x - 1;
    y1 = y;
        // Kiểm tra x1 có nằm ngoài (trên) hay không?
    while(x1 >= 1)
    {
        tempPosition = rows[x1][y1];
        if(tempPosition == initPosition)
        {
            AddWinPosition(winPositionList, x1, y1, count);
            count++;
        }
        else
        {
            break;
        }

        if(count == amount_to_win)
        {
            return winPositionList;
        }
        x1 = x1 - 1;
    }
    
        // Kiểm tra đi xuống
    x1 = x + 1;
    y1 = y;
        // Kiểm tra x1 có nằm ngoài (duới) hay không?
    while(x1 <= amount_of_row)
    {
        tempPosition = rows[x1][y1];
        if(tempPosition == initPosition)
        {
            AddWinPosition(winPositionList, x1, y1, count);
            count++;
        }
        else
        {
            break;
        }

        if(count == amount_to_win)
        {
            return winPositionList;
        }
        x1 = x1 + 1;
    }
    
    // =========== KIỂM TRA THEO CHIỀU DẤU SẮC ===================================================
    count = 1;
        // Kiểm tra đi lên
    x1 = x - 1;
    y1 = y + 1;
        // Kiểm tra x1 có nằm ngoài (trên) và y1 có nằm ngoài (phải) hay không?
    while(x1 >= 1 && y1 <= amount_of_col)
    {
        tempPosition = rows[x1][y1];
        if(tempPosition == initPosition)
        {
            AddWinPosition(winPositionList, x1, y1, count);
            count++;
        }
        else
        {
            break;
        }

        if(count == amount_to_win)
        {
            return winPositionList;
        }
        x1 = x1 - 1;
        y1 = y1 + 1;
    }
    
        // Kiểm tra đi xuống
    x1 = x + 1;
    y1 = y - 1;
        // Kiểm tra x1 có nằm ngoài (duới) và y1 có nằm ngoài (trái) hay không?
    while(x1 <= amount_of_row && y1 >= 1)
    {
        tempPosition = rows[x1][y1];
        if(tempPosition == initPosition)
        {
            AddWinPosition(winPositionList, x1, y1, count);
            count++;
        }
        else
        {
            break;
        }

        if(count == amount_to_win)
        {
            return winPositionList;
        }
        x1 = x1 + 1;
        y1 = y1 - 1;
    }

    // =========== KIỂM TRA THEO CHIỀU NGANG ======================================================
    count = 1;
        // Kiểm tra đi sang phải
    x1 = x;
    y1 = y + 1;
        // Kiểm tra y1 có nằm ngoài (phải) hay không?
    while(y1 <= amount_of_col)
    {
        tempPosition = rows[x1][y1];
        if(tempPosition == initPosition)
        {
            AddWinPosition(winPositionList, x1, y1, count);
            count++;
        }
        else
        {
            break;
        }

        if(count == amount_to_win)
        {
            return winPositionList;
        }
        y1 = y1 + 1;
    }
    
        // Kiểm tra đi sang trái
    x1 = x;
    y1 = y - 1;
        // Kiểm tra y1 có nằm ngoài (trái) hay không?
    while(y1 >= 1)
    {
        tempPosition = rows[x1][y1];
        if(tempPosition == initPosition)
        {
            AddWinPosition(winPositionList, x1, y1, count);
            count++;
        }
        else
        {
            break;
        }

        if(count == amount_to_win)
        {
            return winPositionList;
        }
        y1 = y1 - 1;
    }

    // =========== KIỂM TRA THEO CHIỀU DẤU HUYỀN ====================================================
    count = 1;
        // Kiểm tra đi lên
    x1 = x - 1;
    y1 = y - 1;
        // Kiểm tra x1 có nằm ngoài (trên) và y1 có nằm ngoài (trái) hay không?
    while(x1 >= 1 && y1 >= 1)
    {
        tempPosition = rows[x1][y1];
        if(tempPosition == initPosition)
        {
            AddWinPosition(winPositionList, x1, y1, count);
            count++;
        }
        else
        {
            break;
        }

        if(count == amount_to_win)
        {
            return winPositionList;
        }
        x1 = x1 - 1;
        y1 = y1 - 1;
    }
    
        // Kiểm tra đi xuống
    x1 = x + 1;
    y1 = y + 1;
        // Kiểm tra x1 có nằm ngoài (duới) và y1 có nằm ngoài (phải) hay không?
    while(x1 <= amount_of_row && y1 <= amount_of_col)
    {
        tempPosition = rows[x1][y1];
        if(tempPosition == initPosition)
        {
            AddWinPosition(winPositionList, x1, y1, count);
            count++;
        }
        else
        {
            break;
        }

        if(count == amount_to_win)
        {
            return winPositionList;
        }
        x1 = x1 + 1;
        y1 = y1 + 1;
    }

    // Tới đây mà chưa return có nghĩa là chưa có kết quả
    var winPositionList = [];
    winPositionList[0] = 0;
    return winPositionList;
}

    // CatBranchAB là thuật toán cắt tỉa alpha-beta, để tìm nước đi tốt nhất cho máy tính
function CutBranchAB(rows, modeType, vp, amount_to_win)
{
    var amount_of_row = rows.length;
    var amount_of_col = rows[1].length;
    var ensign, vq;
    if(modeType == "MAX")
    {
        ensign = 0;
    }
    else    // modeType == "MIN"
    {
        ensign = 1;
    }

    var i, j;
    var x, y, found = false;
    for(i=1; i <= amount_of_row; i++)
    {
        for(j=1; j <= amount_of_col; j++)
        {
            if(rows[i][j] == -1)
            {
                rows[i][j] = ensign;
                x = i;
                y = j;
                found = true;
                break;
            }
        }
        if( found )
        {
            break;
        }
    }

        // Check is win?
    var positionList = CheckWin(rows, x, y, amount_to_win);
        // length != 1 is WIN, if length == 1 is NOT WIN
    if(positionList.length != 1)
    {
        if(modeType == "MAX")
        {
            vq = -1;
        }
        else
        {
            vq = 1;
        }
        return vq;
    }
    else    // positionList.length == 1
    {
            // Check is tie?
        var isTie = true;
        for(i=1; i <= amount_of_row; i++)
        {
            for(j=1; j <= amount_of_col; j++)
            {
                if(rows[i][j] == -1)
                {
                    isTie = false;
                    break;
                }
            }
            if( !isTie )
            {
                break;
            }
        }

        if( isTie )
        {
            vq = 0;
            return vq;
        }
        else    // NOT TIE
        {
            if(modeType == "MAX")
            {
                vq = -999;
            }
            else
            {
                vq = 999;
            }

            for(i=1; i <= amount_of_row; i++)
            {
                for(j=1; j <= amount_of_col; j++)
                {
                    if(rows[i][j] == -1)
                    {
                        if(modeType == "MAX")
                        {
                            vq = CutBranchAB(rows, "MIN", vq, amount_to_win);
                            if(vq >= vp)
                            {
                                return vq;
                            }
                        }
                        else
                        {
                            vq = CutBranchAB(rows, "MAX", vq, amount_to_win);
                            if(vq <= vp)
                            {
                                return vq;
                            }
                        }
                    }
                }
            }
            return vq;
        }
    }
}