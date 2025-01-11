#include <string>
#include <vector>
#include <algorithm>

using namespace std;

long long solution(int n, vector<int> times) {
    sort(times.begin(), times.end());
    long long answer = 0, max = times[times.size()-1];
    long long start = 0, end = max * n, mid;
    
    while(start <= end){
        mid = (start+end)/2;
        long long count = 0;
        
        for(int i=0; i<times.size(); i++){
            count += mid / times[i];
        }
        
        if(count < n)
            start = mid + 1;
        else{
            end = mid - 1;
            answer = mid;
        }
    }
    
    return answer;
}