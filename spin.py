import random

def spin_wheel(prizes):
    return random.choice(prizes)

if __name__ == "__main__":
    prizes = ["Thưởng 1", "Thưởng 2", "Thưởng 3", "Thưởng 4", "Thưởng 5", "Thưởng 6"]
    print("Kết quả vòng quay:", spin_wheel(prizes))
