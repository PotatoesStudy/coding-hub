#include <string>
using namespace std;

int solution(string dirs) {
    int answer = 0, x = 5, y = 5;
    int board[11][11][4] = { 0, };    // U0 D1 R2 L3
    
    for(int i=0; i<dirs.size(); i++){
        switch(dirs[i]){
            case 'U':
                if(y < 10){
                    board[x][y++][0] = 1;
                    board[x][y][1] = 1;
                }
                break;
            case 'D':
                if(y > 0){
                    board[x][y--][1] = 1;
                    board[x][y][0] = 1;
                }
                break;
            case 'R':
                if(x < 10){
                    board[x++][y][2] = 1;
                    board[x][y][3] = 1;
                }
                break;
            case 'L':
                if(x > 0){
                    board[x--][y][3] = 1;
                    board[x][y][2] = 1;
                }
                break;
        }   
    }
    
    for(int i=0; i<11; i++){
        for(int j=0; j<11; j++){
            for(int k=0; k<4; k++){
                if(board[i][j][k])
                    answer++;
            }
        }
    }
    
    return answer/2;
}