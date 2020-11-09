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

        // Tới đây mà chưa return có nghĩa là chưa có kết quả hoặc hòa
    var i, j, tie = true;
    for(i=1; i<=amount_of_row; i++)
    {
        for(j=1; j<=amount_of_col; j++)
        {
            if(rows[i][j] == -1)
            {
                tie = false;
                break;
            }
        }
        if( !tie )
        {
            break;
        }
    }
    if( tie )
    {   // Hòa return 1 phần tử
        return [1];
    }
    else 
    {   // Chưa có kết quả, return 0 phần tử
        return [];
    }
}

    // CutBranchAB là thuật toán cắt tỉa alpha-beta, để tìm nước đi tốt nhất cho máy tính
function CutBranchAB(rows, modeType, vp, amount_to_win, x, y)
{
    var amount_of_row = rows.length - 1;
    var amount_of_col = rows[1].length - 1;
    var i, j, vq;
    
        // create new matrix for rows
    var newMatrix = [];
    for(i=1; i <= amount_of_row; i++)
    {
        var cols = [];
        for(j=1; j <= amount_of_col; j++)
        {
            cols[j] = rows[i][j];
        }
        newMatrix[i] = cols;
    }

        // Máy là cờ O, Người là cờ X     
        // MAX là O đi, MIN là X đi
    if(modeType == "MAX")
    {
        newMatrix[x][y] = 1;
    }
    else    // modeType == "MIN"
    {
        newMatrix[x][y] = 0;
    }

        // Check is win? 
        // => length == 0 is NOT RESULT, == 1 is TIE, > 1 is WIN
    var positionList = CheckWin(newMatrix, x, y, amount_to_win); 
        // WIN
    if(positionList.length > 1)
    {
        if(modeType == "MAX")
        {
            vq = -1;
        }
        else
        {
            vq = 1;
        }
        return vq +"_"+ x +"_"+ y;
    }
        // TIE
    else if(positionList.length == 1)
    {
        vq = 0;
        return vq +"_"+ x +"_"+ y;
    }    
        // NOT TIE
    else if(positionList.length == 0)  
    {
        if(modeType == "MAX")
        {
            vq = -999;
        }
        else
        {
            vq = 999;
        }
        
            // Find the positions are empty
        for(i=1; i <= amount_of_row; i++)
        {
            for(j=1; j <= amount_of_col; j++)
            {
                if(newMatrix[i][j] == -1)
                {
                    if(modeType == "MAX")
                    {
                        var str = CutBranchAB(newMatrix, "MIN", vq, amount_to_win, i, j);
                        var temp = Get_Vq(str);
                        if(temp > vq)
                        {
                            vq = temp;
                        }
                        if(vq >= vp)
                        {                               
                            return vq +"_"+ x +"_"+ y;
                        }
                    }
                    else
                    {
                        var str = CutBranchAB(newMatrix, "MAX", vq, amount_to_win, i, j);
                        var temp = Get_Vq(str);
                        if(temp < vq)
                        {
                            vq = temp;
                        }
                        if(vq <= vp)
                        {
                            return vq +"_"+ x +"_"+ y;
                        }
                    }
                }
            }
        }
        return vq +"_"+ x +"_"+ y;
    }
}

function Get_Vq(str)
{
    var temp = str.indexOf("_");
    var vq = str.substring(0, temp) *1;
    return vq;
}