export function giveNeighbourPlayerPosition(playerNumber: number): string {
  switch (playerNumber) {
    case 0:
      return "top-[1px] w-full flex  h-[100px] bg-yellow-600 flex-col-reverse  justify-center items-center ";
    case 1:
      return "  left-[1px] flex flex-row-reverse   w-[80px] h-[87%]  juustify-center items-center";
    case 2:
      return "right-[1px]  flex absolute bottom-0   w-[80px] h-[87%]  juustify-center items-center   ";
    case 3:
      return "bottom-[1px] left-[30%]";

    default:
      return "bottom-[1px] left-[30%]";
  }
}

export function giveNeighbourCardPlayerPosition(playerNumber: number): string {
  switch (playerNumber) {
    case 0:
      return "  flex w-[90%] justify-center items-center";
    case 1:
      return "flex flex-col h-full justify-center items-center";
    case 2:
      return "   flex flex-col   gap-0 h-full justify-center items-center    ";
    case 3:
      return "bottom-[1px] left-[30%]";

    default:
      return "bottom-[1px] left-[30%]";
  }
}

export function giveNeighbourCardPosition(playerNumber: number): string {
  switch (playerNumber) {
    case 0:
      return "w-[50px] h-[80px]";
    case 1:
      return "w-[80px] h-[50px] ";
    case 2:
      return "   w-[80px] h-[50px]     ";
    case 3:
      return "bottom-[1px] left-[30%]";

    default:
      return "bottom-[1px] left-[30%]";
  }
}

export function giveNeighbourMetaInfoPosition(playerNumber: number): string {
  switch (playerNumber) {
    case 0:
      return "";
    case 1:
      return "-rotate-90";
    case 2:
      return "   -rotate-90 ";
    case 3:
      return "bottom-[1px] left-[30%]";

    default:
      return "bottom-[1px] left-[30%]";
  }
}
