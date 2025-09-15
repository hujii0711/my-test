class FourCal:
    
    # 생성자란 객체가 생성될 때 자동으로 호출되는 메서드이다.
    # 객체에 first, second와 같은 초기값을 설정해야 할 필요가 있을 때는 setdata와 같은 메서드를 호출하여
    # 초기값을 설정하기보다 생성자를 구현하는 것이 안전한 방법이다.
    def __init__(self, first, second):
        self.first = first
        self.second = second
    
    def setdata(self, first, second):
        self.first = first
        self.second = second
        
    def add(self):
        result = self.first + self.second
        return result

print(__name__) # 외부에서 모듈 사용시: TModule2 | 자기 자신 직접 실행시 __main__
# if __name__ == "__main__":를 사용하면 외부에서 모듈 사용시에는 수행되지 않고 자기 파일을 직접 실행할 때만 수행된다.
if __name__ == "__main__":
    a = FourCal(4, 2)
    print(a.add())