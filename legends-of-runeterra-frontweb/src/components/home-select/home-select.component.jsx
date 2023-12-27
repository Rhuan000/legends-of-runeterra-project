import { HomeSelectStyled, HomeOptionStyled, onChange } from "./home-select.style";

export function HomeSelect({onChange}){
    return (
        <HomeSelectStyled>
          <HomeOptionStyled value="BR1" onChange={onChange}>BR1</HomeOptionStyled>
          <HomeOptionStyled value="LA1">LA1</HomeOptionStyled>
          <HomeOptionStyled value="LA2">LA2</HomeOptionStyled>
          <HomeOptionStyled value="NA1">NA1</HomeOptionStyled>
         
        </HomeSelectStyled>
      );
}